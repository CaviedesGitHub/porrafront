export class Apostador {
    id: number;
    usuario: string;
    contrasena: string;
    nombre_apostador: string;
    apellido_apostador: string;
    correo: string;
    saldo: string;
    //apuestas: Array<Apuesta>

    constructor(
      id: number,
      usuario: string,
      contrasena: string,
      nombre_apostador: string,
      apellido_apostador: string,
      correo: string,
      saldo: string
      //apuestas: Array<Apuesta>
    )
    {
      this.id=id,
      this.usuario= usuario,
      this.contrasena= contrasena,
      this.nombre_apostador= nombre_apostador,
      this.apellido_apostador= apellido_apostador,
      this.correo= correo,
      this.saldo= saldo
      //this.apuestas= apuestas
    }
}

