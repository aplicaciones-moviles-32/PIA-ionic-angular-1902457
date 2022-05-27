import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  latitud:number;
  latitudRound: number;
  longitud:number;
  loggedUser=this.authService.getLoggedUser();
  
  ngOnInit() {
    this.ObtenerCoordenadas();
    console.log('Este es e loggedUser: ' + this.loggedUser)
  }

  async ObtenerCoordenadas(){
    const ObtenerCoordenada=await Geolocation.getCurrentPosition();
    this.latitud=ObtenerCoordenada.coords.latitude;
    this.latitudRound = Math.floor(this.latitud);
    console.log('La latitud es: ' + this.latitudRound);
    this.longitud=ObtenerCoordenada.coords.longitude;
  }
  usuario : any = {}
  editando = false;

  toggleEditar(): void {
    this.editando = !this.editando;
  }

}
