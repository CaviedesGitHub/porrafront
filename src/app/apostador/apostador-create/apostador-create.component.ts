import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Apostador } from '../apostador';
import { ApostadorService } from '../apostador.service';

@Component({
  selector: 'app-apostador-create',
  templateUrl: './apostador-create.component.html',
  styleUrls: ['./apostador-create.component.css']
})
export class ApostadorCreateComponent implements OnInit {

  apostadorForm!: FormGroup;
  userId: number
  token: string

  constructor(
    private apostadorService: ApostadorService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService
  ) { }


  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.apostadorForm = this.formBuilder.group({
        nombre_apostador: ["", [Validators.required, Validators.minLength(2)]],
        apellido_apostador: ["", [Validators.required, Validators.minLength(2)]],
        usuario: ["", [Validators.required, Validators.maxLength(15)]],
        correo: ["", [Validators.required, Validators.email]],
        saldo: ["", Validators.min(0)]
      })
    }
  }

  createApostador(apos: Apostador){
    //console.info("El Apostador fue creado: ", apos)
    //this.toastr.success("Confirmation", "Antes")
    this.apostadorService.createApostador(apos, this.token).subscribe(apos=>{
       console.info("El Apostador fue creado: ", apos)
       this.toastr.success("Confirmation", "Apostador creado")
       this.apostadorForm.reset();
    })
  }

  cancelCreation(){
    this.apostadorForm.reset();
    this.routerPath.navigate([`/apostadores/${this.userId}/${this.token}`])
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess(apuesta: Apostador) {
    this.toastr.success(`El Apostador fue Creado.`, "Creación exitosa");
  }

}
