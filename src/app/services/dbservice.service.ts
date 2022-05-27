import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  constructor(private http : HttpClient) { }

  //GET
  getPublicaciones(): any {
    return this.http.get(environment.firebase.databaseURL + '/publicaciones.json')
  }

  getDatosUsuario(): any {
    return this.http.get(environment.firebase.databaseURL + '/usuario.json')
  }

  getPublicacionesUsuario(): any {
    return this.http.get(environment.firebase.databaseURL + '/usuario/publicaciones.json')
  }

  getPublicacionDetalle(id: string): any {
    return this.http.get(environment.firebase.databaseURL + '/publicaciones/'+ id +'.json')
  }

  //POST
  postPublicacion(post: any) {
    return this.http.post(environment.firebase.databaseURL + '/publicaciones.json', post)
  }

  //DELETE
  deletePublicacion(id: number){
    return this.http.delete(environment.firebase.databaseURL + '/publicaciones/'+ id.toString() + '.json')
  }

  //PUT
  updatePublicacion(id: number, nuevosDatos: any) {
    return this.http.put(environment.firebase.databaseURL + '/publicaciones/'+ id.toString() +'.json', nuevosDatos)
  }
  
}
