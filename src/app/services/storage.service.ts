import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebase);
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storageRef=firebase.app().storage().ref();

  constructor() { }

  async postImg(nombre:string, imgBase64:any){
    try {
      let respuesta=await this.storageRef.child("users/"+nombre).putString(imgBase64,'data_url');
      return respuesta.ref.getDownloadURL();
    } catch (error) {
      console.log('Error al subir imagen' + error);
      return null;
    }
  }
}
