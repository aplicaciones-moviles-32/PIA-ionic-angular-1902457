import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthenticationService
  ) { }
  loggedUser = this.authService.getLoggedUser();
  cerrarSesion() {
    this.authService.logOut();
  }
  ngOnInit() {}

}
