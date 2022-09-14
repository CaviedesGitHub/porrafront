import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { range } from 'rxjs';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {
  i=0
  helper = new JwtHelperService();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  error: boolean = false

  ngOnInit() {
  }

  onLogInUsuario(usuario: string, contrasena: string) {
    var i:number
    //for(i=0; i<30; i++){


      this.error = false

      this.usuarioService.userLogIn(usuario, contrasena)
        .subscribe(res => {
          const decodedToken = this.helper.decodeToken(res.token);
          this.router.navigate([`/carreras/${decodedToken.sub}/${res.token}`])
        },
          error => {
            this.error = true
          })
    //}
  }

}
