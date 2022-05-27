import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { DbserviceService } from '../services/dbservice.service';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {

  key = 123;
  posts: any = [];
  reves: any = [];
  tester: any = [];
  filtro: string = '';
  isPopoverOpen: boolean = false;
  userLogged = this.authService.getLoggedUser();

  constructor(
    private db: DbserviceService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.loadFeed();
  }             

  loadFeed() {
    this.db.getPublicaciones().subscribe(response => {      
      this.tester = Object.values(response);
      console.log(this.tester);
      for(let test of this.tester){
         if(test != null){
           this.posts = this.posts.concat(test);
        }
      }      
      this.reves=this.posts.reverse();
    })
  }
}
