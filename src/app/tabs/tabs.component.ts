import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
  ) { }
  loggedUser = this.authenticationService.getLoggedUser();
  ngOnInit() {}

}
