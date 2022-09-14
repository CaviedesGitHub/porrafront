import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ApostadorService } from '../apostador.service';

@Component({
  selector: 'app-apostador-login',
  templateUrl: './apostador-login.component.html',
  styleUrls: ['./apostador-login.component.css']
})
export class ApostadorLoginComponent implements OnInit {

  helper = new JwtHelperService();

  constructor(
    private apostadorService: ApostadorService,
    private router: Router
  ) { }

  error: boolean = false

  ngOnInit() {
  }

  onLogInApostador(usuario: string, contrasena: string) {
    this.error = false

    this.apostadorService.apostadorLogIn(usuario, contrasena)
      .subscribe(res => {
        const decodedToken = this.helper.decodeToken(res.token);
        this.router.navigate([`/apuestasApostador/${decodedToken.sub}/${res.token}`])
      },
        error => {
          this.error = true
        })
  }

}
