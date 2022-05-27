import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  ionicForm!: FormGroup;
  isSubmitted = false;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController
  ) { }
  
  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: new FormControl ('', [Validators.required]),
      password: new FormControl ('', [Validators.required])      
    })
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
      this.authService.login(this.ionicForm.get('email').value, this.ionicForm.get('password').value).then(response =>{
        if (response === null) {
          this.presentAlert();
        } else {
          console.log('Sesión iniciada con exito')
          window.location.href="/feed"
        }
      })
      return true;
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'al iniciar sesión',
      message: 'El correo o contraseña son incorrectos, inténtelo de nuevo.',
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
