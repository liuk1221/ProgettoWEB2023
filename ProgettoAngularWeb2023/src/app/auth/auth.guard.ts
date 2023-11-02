import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servizi/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  //DAL NUOVO AGGIORNAMENTO ANGULAR NON E' POSSIBILE INIETTARI I SERVIZI TRAMITE COSTRUTTORE, BISOGNA USARE IL METODO INJECT
  const authService = inject(AuthService)
  const router = inject(Router)
  
  if (authService.isAuthenticated()) {
    return true;                                    //L'utente è autorizzato a accedere alla route
  } else {
                                                    //Se l'utente non è autorizzato, effettua il redirect alla pagina di errore
    router.navigate(['/unauthorized']);             //'unahuthorized' è il percorso alla pagina di errore
    return false;                                   //La route originale non sarà attivata
  }
};
