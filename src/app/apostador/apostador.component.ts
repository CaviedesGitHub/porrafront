import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { Apostador } from './apostador';
import { ApostadorService } from './apostador.service';

@Component({
  selector: 'app-apostador',
  templateUrl: './apostador.component.html',
  styleUrls: ['./apostador.component.css']
})
export class ApostadorComponent implements OnInit {
  apostadores:Array<Apostador>=[new Apostador(1, '', '', '', '', '', '1000000')]
  userId: number
  token: string

  constructor(
    private apostadorService: ApostadorService,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService
  ) { }

  getApostadores():void{
    this.apostadorService.getApostadores(this.token).subscribe(apostadores => this.apostadores=apostadores);
  }

  ngOnInit() {
    if (!parseInt(this.router.snapshot.params.userId) || this.router.snapshot.params.userToken === " ") {
      this.showError("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
    }
    else {
      this.userId = parseInt(this.router.snapshot.params.userId)
      this.token = this.router.snapshot.params.userToken
      this.getApostadores();
    }
  }

  showWarning(warning: string) {
    this.toastr.warning(warning, "Error de autenticación")
  }

  showError(error: string) {
    this.toastr.error(error, "Error de autenticación")
  }

  showSuccess() {
    this.toastr.success(`La apuesta fue eliminada`, "Eliminada exitosamente");
  }

}
