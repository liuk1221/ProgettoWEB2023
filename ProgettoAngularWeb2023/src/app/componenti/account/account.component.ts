import { Component } from '@angular/core';
import { AuthService } from 'src/app/servizi/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  constructor(public auth : AuthService){}

  
}
