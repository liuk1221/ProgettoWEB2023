import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router';
//import { user } from 'rxfire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAdmin: boolean = null
  isLoggedIn = false
  userEmail: string = null
  
  //Inniettiamo il pacchetto nel costruttore
  constructor(private fireauth : AngularFireAuth, private router : Router,  private firestore: AngularFirestore) { }

  //MetodoLogin
  login(email: string, password: string){
    this.fireauth.signInWithEmailAndPassword(email,password).then( () => {          //Metodo che accede ad un istanza già esistente
      localStorage.setItem('token','true')                                          //Crea l'item nello store locale del browser
      this.router.navigate([''])                                                    //Mi riporta alla home dopo il login
      this.isLoggedIn = true
      this.userEmail=email                                                          //Salva la mail solo se l'utente è salvato
      console.log("Il login è andato a buon fine, email: "+this.userEmail)
    }, err => {
      alert('Oops! Qualcosa è andato storto!')                                      //Messaggio di errore nel caso di mancato login
      this.router.navigate(['/login'])                                              //Mi riporta alla pagina di login
    })
  }

  //MetodoRegister
  register(email: string, password: string){                                       
    this.fireauth.createUserWithEmailAndPassword(email,password).then( () => {      //Metodo che crea un nuovo utente
      alert('Registrazione avvenuta con successo!')                                 //Alert di avvenuta creazione
      this.router.navigate(['/login'])                                              //Reindirizzamento alla pagina di login per accedere
    }, err => {
      alert('Oops! Qualcosa è andato storto!')                                      //Messaggio di errore nel caso di mancata registrazione
      this.router.navigate(['/register'])                                           //Mi riporta alla pagina di register
    })
  }

  //MetodoLogOut
  logout(){
    this.fireauth.signOut().then( () => {                                           //Metodo che esce dalla sessione corrente dell'utente
      localStorage.removeItem('token')                                              //Rimuove l'item inserito nel login nel local s. del browser
      this.router.navigate(['/login'])                                              //Riporta alla pagina di login
      this.isLoggedIn = false
      this.isAdmin = false
      this.userEmail = null
      console.log("Il logout è andato a buon fine, email: "+this.userEmail)
    }, err => {
      alert('Oops! Qualcosa è andato storto!')                                      //Messaggio di errore nel caso di mancato logout
    })
  }


  getUserInfoSave() {
    this.fireauth.authState.subscribe(user => {
      if (user) {
        console.log('Utente autenticato:', user);
        this.saveUserInfo(user)
        // this.user = user
        // Ora si possono salvare queste informazioni nel Firestore se necessario
      } else {
        console.log('Nessun utente autenticato');
        // this.user = null
      }
    });
  }

  saveUserInfo(user: any) {
    const userData = {
      name: user.displayName,
      email: user.email
      // Altre informazioni dell'utente che vengono salvate
    };
  
    // Crea o aggiorna il documento utente nel Firestore
    this.firestore.collection('users').doc(user.uid).set(userData, { merge: true }) //Grazie a doc() ottengo un riferimento specifico all'interno della raccolta
      .then(() => {
        console.log('Informazioni utente salvate con successo in Firestore');
        this.checkIfAdmin(user.uid)
      })
      .catch(error => {
        console.error('Errore nel salvataggio delle informazioni utente:', error);
      });
  }


  // Funzione per verificare se il campo "isAdmin" esiste ed è true
  checkIfAdmin(userId: string) {
  // Ottieni un riferimento al documento dell'utente nella collezione "users"
  const userRef = this.firestore.collection('users').doc(userId);
  userRef.get().subscribe((docSnapshot) => {                                                    //Serve per ottenere il riferimento al documento
    if (docSnapshot.exists) {
      const userData = docSnapshot.data() as { isAdmin: boolean };                              //Il documento esiste, verifica il campo "isAdmin"
      const isAdmin = userData.isAdmin;                                                         //La riga sopra serve a evitare l'errore: la proprietà 'isAdmin' non esiste nel tipo 'unknown'.
      if (isAdmin === true) {
        console.log('L\'utente è un amministratore.');                                          // Il campo "isAdmin" esiste ed è true
        this.isAdmin=true;
      } else {
        console.log('L\'utente non è un amministratore.');                                      // Il campo "isAdmin" esiste, ma è false
        this.isAdmin=false;
      }
    } else {
      // Il documento non esiste
      console.log('L\'utente non esiste o il documento non contiene il campo "isAdmin".');      //Il campo "isAdmin" non esiste proprio. OPZIONE PIU' RICORRENTE
      this.isAdmin=null;
    }
  });
  }

  //METODO UTILIZZATO DALLA GUARDIA PER EVITARE DI ATTIVARE ROUTE NON ACCESSIBILI
  isAuthenticated(){
    return this.isLoggedIn;
  }
}
