import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbserviceService } from '../services/dbservice.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
})
export class PublicacionesComponent implements OnInit {

  loggedUser = this.authService.getLoggedUser();
  publicaciones : any = [];
  posts: any = [];
  indexes: any = [];
  tester: any = [];
  filtro: string = '';

  constructor(    
    private db: DbserviceService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loadPosts();
  }  
  
  loadPosts() {
    this.db.getPublicaciones().subscribe(response => {      
      this.tester = Object.values(response);
      let i;
      i = Object.keys(this.tester).length - 1;
      let j;
      j = 0;
      for(let test of this.tester){
        console.log('i:' + i);
        if(test != null && test.id == this.authService.getUserId()) {
          console.log('->j:' + j);
          this.posts.push(test);
          this.indexes[j] = i;
          j++;
        }
        i--;
      }
      this.indexes.reverse();
      console.log(this.posts);
      console.log(Object.keys(response).reverse());
      this.posts.reverse();
    })   
  }
}
