import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SignupComponent } from './components/signup/signup.component';
import { WatchVideoComponent } from './components/watch-video/watch-video.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchResultComponent },
  { path: 'watch', component: WatchVideoComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
