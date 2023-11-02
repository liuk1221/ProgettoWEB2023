import { Component } from '@angular/core';
import { AuthService } from 'src/app/servizi/auth.service';
import { ScrollToTopService } from 'src/app/servizi/scroll-to-top.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  //Iniezione del servizio
  constructor(public auth : AuthService, public scroll: ScrollToTopService){}

  //Metodo per il logout
  onLogout(){
    this.auth.logout()
  }
}
