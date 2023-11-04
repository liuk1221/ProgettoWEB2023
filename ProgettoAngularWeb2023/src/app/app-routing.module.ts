import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenti/home/home.component';
import { AboutComponent } from './componenti/about/about.component';
import { ShopComponent } from './componenti/shop/shop.component';
import { NotFoundComponent } from './componenti/not-found/not-found.component';
import { LoginComponent } from './componenti/login/login.component';
import { RegisterComponent } from './componenti/register/register.component';
import { AccountComponent } from './componenti/account/account.component';
import { authGuard } from './auth/auth.guard';
import { NotLoggedInErrorComponent } from './componenti/not-logged-in-error/not-logged-in-error.component';
import { adminGuard } from './auth/admin.guard';
import { GestioneComponent } from './componenti/gestione/gestione.component';
import { AcquistoComponent } from './componenti/acquisto/acquisto.component';


//Qui vengono impostate tutte le route. Fondamentali in angular in quanto il tutto è gestito in single-page
const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'shop', component: ShopComponent},
  {path:'shop/:category', component: ShopComponent },
  {path:'buyNow', component: AcquistoComponent, canActivate: [authGuard]},
  {path:'about', component: AboutComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'account', component: AccountComponent, canActivate: [authGuard]},
  {path:'gestione', component: GestioneComponent, canActivate: [adminGuard]},
  {path:'unauthorized', component: NotLoggedInErrorComponent},
  {path:'404', component: NotFoundComponent},
  {path:'**', redirectTo: '/404'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
