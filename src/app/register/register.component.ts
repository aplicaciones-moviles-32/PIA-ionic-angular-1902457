import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { StorageService } from '../services/storage.service';
import { getAuth, updateProfile } from 'firebase/auth';
import { AlertController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private storage: StorageService,
    public alertController: AlertController
  ) { }

  ionicForm!: FormGroup;
  imagenSubida: any;
  urlImgFirebase: any;

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: new FormControl ('', [Validators.required]),
      email: new FormControl ('', [Validators.required]),
      password: new FormControl ('', [Validators.required]),
      password2: new FormControl ('', [Validators.required]),
    })
  }

  postImg = (usuario: any, image: any) => {
    return new Promise((resolve) => {
      this.storage.postImg(usuario + "_" + Date.now(),image).then(urlImagen => {
        this.urlImgFirebase = urlImagen;
        console.log(this.urlImgFirebase);
        resolve(this.urlImgFirebase);
      });  
    })
  }

  cargarImagen(event: any){
    try {
      let archivos = event.target.files
      this.authService.getLoggedUser();
      let reader=new FileReader();
        reader.readAsDataURL(archivos[0]);
        reader.onloadend=()=>{
        this.imagenSubida = reader.result;
        }
    } catch(err) {
      console.log("error subir foto",err)
    }
  }

  submitForm() {
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      if (this.ionicForm.get('password').value !== this.ionicForm.get('password2')) {
        let url, id;
        const user = {
          email: this.ionicForm.get('email').value,
          password: this.ionicForm.get('password').value,
          name: this.ionicForm.get('name').value
        }
        this.postImg(user, this.imagenSubida).then(responseImg => {
          url = responseImg;        
          this.authService.register(user.email, user.password).then(response => {
            console.log("Registro exitoso:", response);
            id = this.authService.getUserId();
            const auth = getAuth();
            updateProfile(auth.currentUser, { displayName: user.name, photoURL: url }).then(() => {
              this.presentAlert1();
              window.location.href="/feed";
            }).catch((error) => {
              console.log('Error de registro: ' + error);
            });
          });
        });
      } else {
        this.presentAlert2();
      }
    }  
  }

  async presentAlert1 () {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Registrado',
      message: 'Se ha registrado correctamente',
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentAlert2 () {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'al registrarse',
      message: 'No se ha podido registrar correctamente.',
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
