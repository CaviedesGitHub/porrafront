import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Carrera, Competidor } from 'src/app/carrera/carrera';
import { CarreraService } from 'src/app/carrera/carrera.service';
import { Apuesta } from '../apuesta';
import { ApuestaService } from '../apuesta.service';
import { ApostadorService } from 'src/app/apostador/apostador.service';
import { Apostador } from 'src/app/apostador/apostador';

@Component({
  selector: 'app-apuesta-edit',
  templateUrl: './apuesta-edit.component.html',
  styleUrls: ['./apuesta-edit.component.css']
})
export class ApuestaEditComponent implements OnInit {

  userId: number;
  token: string;
  apuestaId: number;
  apuestaForm!: FormGroup;
  carreras: Array<Carrera>
  competidores: Array<Competidor>
  apostadores: Array<Apostador>
  nombreApostador: String ="Nombre por defecto."

  constructor(
    private apuestaService: ApuestaService,
    private carreraService: CarreraService,
    private apostadorService: ApostadorService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.apuestaService.getApuesta(this.router.snapshot.params.apuestaId, this.token)
        .subscribe(apuesta => {
          this.apuestaId = apuesta.id
          this.apuestaForm = this.formBuilder.group({
            id_carrera: [apuesta.id_carrera, [Validators.required]],
            id_competidor: [apuesta.id_competidor, [Validators.required]],
            id_apostador: [apuesta.id_apostador, [Validators.required]],
            nombre_apostador: [apuesta.nombre_apostador],  //, [Validators.required, Validators.minLength(1), Validators.maxLength(128)]
            valor_apostado: [Number(apuesta.valor_apostado).toFixed(2), [Validators.required]]
          })
          this.getCarreras(apuesta.id_carrera)
          this.getApostadores()
        })
    }
  }

  onApostadorSelect(event: any): void {
    if (event != null && event != "") {
      var apostadorSeleccionado = this.apostadores.filter(x => x.id == event)[0]
      this.nombreApostador=apostadorSeleccionado.nombre_apostador
      //this.apuestaForm.setValue({nombre_apostador: apostadorSeleccionado.nombre_apostador})
      //this.apuestaForm.get('nombre_apostador')?.markAsDirty()
      //this.apuestaForm.markAllAsTouched()
      //this.apuestaForm.markAsDirty()
    }
  }

  getApostadores(): void {
    this.apostadorService.getApostadores(this.token)
      .subscribe(apostadores => {
        this.apostadores = apostadores
      },
        error => {
          console.log(error)
          if (error.statusText === "UNAUTHORIZED") {
            this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
          }
          else if (error.statusText === "UNPROCESSABLE ENTITY") {
            this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
          }
          else {
            this.showError("Ha ocurrido un error. " + error.message)
          }
        })
  }

  onCarreraSelect(event: any): void {
    if (event != null && event != "") {
      var carreraSeleccionada = this.carreras.filter(x => x.id == event)[0]
      this.competidores = carreraSeleccionada.competidores
    }
  }

  getCarreras(id_carrera: number): void {
    this.carreraService.getCarreras(this.userId, this.token)
      .subscribe(carreras => {
        this.carreras = carreras
        this.onCarreraSelect(id_carrera)
      },
        error => {
          console.log(error)
          if (error.statusText === "UNAUTHORIZED") {
            this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
          }
          else if (error.statusText === "UNPROCESSABLE ENTITY") {
            this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
          }
          else {
            this.showError("Ha ocurrido un error. " + error.message)
          }
        })

  }

  cancelCreate() {
    this.apuestaForm.reset()
    this.routerPath.navigate([`/apuestas/${this.userId}/${this.token}`])
  }

  editarApuesta(newApuesta: Apuesta) {
    this.apuestaService.editarApuesta(newApuesta, this.apuestaId, this.token)
      .subscribe(apuesta => {
        this.showSuccess(apuesta)
        this.apuestaForm.reset()
        this.routerPath.navigate([`/apuestas/${this.userId}/${this.token}`])
      },
        error => {
          if (error.statusText === "UNAUTHORIZED") {
            this.showWarning("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
          }
          else if (error.statusText === "UNPROCESSABLE ENTITY") {
            this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
          }
          else {
            this.showError("Ha ocurrido un error. " + error.message)
          }
        })
  }

  showError(error: string) {
    this.toastr.error(error, "Error")
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showSuccess(apuesta: Apuesta) {
    this.toastr.success(`La apuesta ${apuesta.id} fue editada`, "Edición exitosa");
  }

}
