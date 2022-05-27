import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { StorageService } from '../services/storage.service';
import { getAuth, updateProfile } from 'firebase/auth';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
})
export class EditarPerfilComponent implements OnInit {

  usuario = {
    nombre: ''
  }
  loadedImg: any;
  urlImgFirebase: any;

  constructor (
    private authService: AuthenticationService,
    private storage: StorageService
  ) { }

  ngOnInit () {
    this.usuario.nombre = this.authService.getUserName();
  }
    
  loadImg (event: any) {
    try{
      let archivos=event.target.files
      this.authService.getLoggedUser();
      let reader=new FileReader();
      reader.readAsDataURL(archivos[0]);
      reader.onloadend=()=>{
        this.loadedImg=reader.result;
      }
    } catch (err) {
      console.log("error subir foto",err)
    }    
  }

  changeImg () {
    this.postImg(this.usuario,this.loadedImg).then(urlResponse => {
      let id;
      let url;
      url = urlResponse;
      id = this.authService.getUserId();
        const auth = getAuth();
        updateProfile(auth.currentUser, { photoURL: url }).then(() => {
          window.location.href="/perfil";
        }).catch((error) => {
          console.log(error);
        });
    });
  }
  
  postImg = (usuario: any, image: any) => {
    return new Promise((resolve) => {
      this.storage.postImg(usuario + "_" + Date.now(),image).then(urlImagen=> {
        this.urlImgFirebase = urlImagen;
        resolve(this.urlImgFirebase);
      });  
    })
  }

  changeName () {
    const auth = getAuth();
    updateProfile(auth.currentUser, { displayName: this.usuario.nombre }).then(() => {
      window.location.href="/perfil";
    }).catch((error) => {
      console.log(error);
    });
  }
}
