import { Component } from '@angular/core';
import { AuthService } from 'src/app/servizi/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  //Iniezione del servizio
  constructor(public auth : AuthService){}

  //Metodo per il logout
  onLogout(){
    this.auth.logout()
  }
}
