import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { popoverController } from '@ionic/core';

import { TabsComponent } from './tabs/tabs.component';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { HistoriasComponent } from './historias/historias.component';
import { RegisterComponent } from './register/register.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { AngularFireModule } from '@angular/fire/compat';
import { HistoriasContentComponent } from './historias-content/historias-content.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { PopoverComponent } from './popover/popover.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    AppComponent, 
    TabsComponent,
    LoginComponent,
    FeedComponent,
    HistoriasComponent,
    RegisterComponent,
    EditarPerfilComponent,
    HistoriasContentComponent,
    NavbarComponent,
    PublicacionComponent,
    PerfilComponent,
    PublicacionesComponent,
    PopoverComponent,
    PostComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideAuth(() => getAuth()), 
    provideDatabase(() => getDatabase()), 
    provideFirestore(() => getFirestore()), 
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
