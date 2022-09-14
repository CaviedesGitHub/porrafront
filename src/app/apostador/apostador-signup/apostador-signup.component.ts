import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';
import { ApostadorService } from '../apostador.service';

@Component({
  selector: 'app-apostador-signup',
  templateUrl: './apostador-signup.component.html',
  styleUrls: ['./apostador-signup.component.css']
})
export class ApostadorSignupComponent implements OnInit {

  helper = new JwtHelperService();
  apostadorForm: FormGroup;

  constructor(
    private apostadorService: ApostadorService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.apostadorForm = this.formBuilder.group({
      usuario: ["", [Validators.required, Validators.maxLength(15)]],
      contrasena: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      confirmContrasena: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      nombre_apostador: ["", [Validators.required, Validators.minLength(2)]],
      apellido_apostador: ["", [Validators.required, Validators.minLength(2)]],
      correo: ["", [Validators.required, Validators.email]],
      saldo: ["", Validators.min(0)]
    })
  }

  registrarApostador() {
    this.apostadorService.apostadorSignUp(this.apostadorForm.get('usuario')?.value,
                                          this.apostadorForm.get('contrasena')?.value,
                                          this.apostadorForm.get('nombre_apostador')?.value,
                                          this.apostadorForm.get('apellido_apostador')?.value,
                                          this.apostadorForm.get('correo')?.value,
                                          this.apostadorForm.get('saldo')?.value)
      .subscribe(res => {
        const decodedToken = this.helper.decodeToken(res.token);
        this.router.navigate([`/apuestasApostador/${decodedToken.sub}/${res.token}`])
        this.showSuccess()
      },
        error => {
          this.showError(`Ha ocurrido un error: ${error.message}`)
        })
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showSuccess() {
    this.toastr.success(`Se ha registrado exitosamente`, "Registro exitoso");
  }

}

