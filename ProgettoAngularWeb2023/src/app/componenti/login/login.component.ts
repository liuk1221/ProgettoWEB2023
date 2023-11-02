import { Component } from '@angular/core';
import { AuthService } from 'src/app/servizi/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = ''
  password: string = ''


  constructor(private auth : AuthService){}

  //MetodoLoginPresoDalServizio
  onLogin(){
    if(this.email == ''){
      alert('inserisci tutti i valori necessari')
      return
    }
    if(this.password == ''){
      alert('inserisci tutti i valori necessari')
      return
    }
      this.auth.login(this.email,this.password)
      this.auth.getUserInfoSave()
      this.email=''
      this.password=''
    
  }
}
