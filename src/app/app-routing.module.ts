import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { RegisterComponent } from './register/register.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'perfil', component: PerfilComponent},
  { path: 'publicacion/:idPost', component: PublicacionComponent },
  { path: 'editar', component: EditarPerfilComponent },
  { path: 'post', component: PostComponent },
  { path: '**', component: FeedComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
