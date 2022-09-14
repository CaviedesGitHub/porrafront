import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Apostador } from '../apostador';
import { ApostadorService } from '../apostador.service';

@Component({
  selector: 'app-apostador-edit',
  templateUrl: './apostador-edit.component.html',
  styleUrls: ['./apostador-edit.component.css']
})
export class ApostadorEditComponent implements OnInit {
  apostadorForm!: FormGroup;
  userId: number;
  token: string;
  apostadorId: number;

  constructor(private apostadorService: ApostadorService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService,){
    }

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
       this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
        this.userId = parseInt(this.router.snapshot.params.userId)
        this.token = this.router.snapshot.params.userToken
        this.apostadorService.getApostador(this.router.snapshot.params.apostadorId, this.token)
        .subscribe(apostador => {
            this.apostadorId = apostador.id
            this.apostadorForm = this.formBuilder.group({
              nombre_apostador: [apostador.nombre_apostador, [Validators.required, Validators.minLength(2)]],
              apellido_apostador: [apostador.apellido_apostador, [Validators.required, Validators.minLength(2)]],
              usuario: [apostador.usuario, [Validators.required, Validators.maxLength(15)]],
              correo: [apostador.correo, [Validators.required, Validators.email]],
              saldo: [Number(apostador.saldo).toFixed(2), [Validators.required, Validators.min(0)]]
         })
        //this.getApuestas(apostador.id)
      })
    }
  }

  editApostador(apos: Apostador){
    this.toastr.success("Ingreso", "editApostador")
    this.apostadorService.editApostador(apos, this.apostadorId, this.token).subscribe(apos=>{
      console.info("El Apostador fue modificado: ", apos)
      this.toastr.success("Confirmation", "Apostador modificado")
      this.apostadorForm.reset();
    })
  }

  cancelEdition(){
    this.apostadorForm.reset();
    this.routerPath.navigate([`/apostadores/${this.userId}/${this.token}`])
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess(apostador: Apostador) {
    this.toastr.success(`El Apostador ${apostador.id} fue editado.`, "Edición exitosa");
  }

}
