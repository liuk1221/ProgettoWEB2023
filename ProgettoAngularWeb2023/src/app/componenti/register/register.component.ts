import { Component } from '@angular/core';
import { AuthService } from 'src/app/servizi/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = ''
  password: string = ''

  constructor(private auth : AuthService){}
  
  ngOnInit(): void {
  }

  //MetodoRegisterPresoDalServizio
  onRegister(){
    if(this.email == ''){
      alert('inserisci tutti i valori necessari')
      return
    }
    if(this.password == ''){
      alert('inserisci tutti i valori necessari')
      return
    }
      this.auth.register(this.email,this.password)
      this.email=''
      this.password=''
    
  }
}
