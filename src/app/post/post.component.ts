import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { NgForm } from '@angular/forms';
import { DbserviceService } from '../services/dbservice.service';
import { StorageService } from '../services/storage.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  newPost: any = {
    caption: "", 
    id: "", 
    imgPublicacion: "", 
    userName: "",    
    imgUser: ""
  }
  picture: string;
  loadedImg: any;
  usuario: any;
  urlImgFirebase: any;
  loggedUser = this.authService.getLoggedUser();

  constructor (
    private db: DbserviceService,
    private storage: StorageService,
    private authService: AuthenticationService
  ) { }

  ngOnInit () {}

  async takePhoto () {
    try{
      const image=await Camera.getPhoto({
        quality:100,
        allowEditing:false,
        resultType:CameraResultType.DataUrl,
      });
      this.picture = image.dataUrl;      
      let usuario = this.authService.getUserId();      
      this.usuario = usuario;
      this.loadedImg = image.dataUrl;
    } catch(error) {
      console.log('Error al tomar foto' + error);
    }
  }
  
  postImg = (usuario: any, image: any) => {    
    return new Promise((resolve)=>{
      this.storage.postImg(usuario + "_" + Date.now(), image).then(url => {      
        this.urlImgFirebase=url;
        this.newPost.imgPublicacion=this.urlImgFirebase;
        console.log(this.urlImgFirebase);
        resolve(this.urlImgFirebase);
      });
    })
  }

  loadImg (event: any) {
    try{
      let files = event.target.files
      this.authService.getLoggedUser();
      let usuario = this.authService.getUserId();
      let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {          
          this.loadedImg = reader.result;
          this.usuario=usuario;
        }
    } catch(error) {
      console.log('Error al subir foto: ' + error)
    }        
  }
    
  onSubmit (f: NgForm) {
    console.log("Submit")
  }
  
  actualizarnewPost () {
    this.newPost.id = this.authService.getUserId();
    this.newPost.userName = this.authService.getUserName();
    this.newPost.imgUser = this.authService.getUserPic();
    this.postImg(this.usuario,this.loadedImg).then(response => {      
      this.db.postPublicacion(this.newPost).subscribe();
    });        
  }

  post () {    
    this.newPost.id=this.authService.getUserId();
    this.newPost.userName=this.authService.getUserName();
    this.newPost.imgUser=this.authService.getUserPic();
    this.postImg(this.usuario,this.loadedImg).then(x=>{
      console.log("subida"+{x});
      this.db.postPublicacion(this.newPost).subscribe(res=>{
        window.location.href="/feed";
      });
    });
  }
}
