import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apostador } from './apostador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApostadorService {
  private backUrl: string = "https://porraback.herokuapp.com"
  constructor(private http:HttpClient) { }

  getApostadores(token: string):Observable<Apostador[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Apostador[]>(`${this.backUrl}/apostadores`, { headers: headers });
  }

  getApostador(idApostador: number, token: string): Observable<Apostador> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Apostador>(`${this.backUrl}/apostador/${idApostador}`, { headers: headers })
  }

  createApostador(apostador: Apostador, token: string): Observable<Apostador> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<Apostador>(`${this.backUrl}/apostadores`, apostador, { headers: headers });
  }

  editApostador(apostador: Apostador, apostadorId: number, token: string): Observable<Apostador> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.put<Apostador>(`${this.backUrl}/apostador/${apostadorId}`, apostador, { headers: headers });
  }

  deleteApostador(apostadorId: number, token: string): Observable<Apostador> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete<Apostador>(`${this.backUrl}/apostador/${apostadorId}`, { headers: headers });
  }

  apostadorLogIn(usuario: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.backUrl}/loginApostador`, { "usuario": usuario, "contrasena": contrasena });
  }

  apostadorSignUp(usuario: string, contrasena: string, nombre_apostador: string, apellido_apostador: string, correo: string, saldo: string): Observable<any> {
    return this.http.post<any>(`${this.backUrl}/signinApostador`, { "usuario": usuario,
                                                                    "contrasena": contrasena,
                                                                    "nombre_apostador": nombre_apostador,
                                                                    "apellido_apostador": apellido_apostador,
                                                                    "correo": correo,
                                                                    "saldo": saldo })
  }

}
