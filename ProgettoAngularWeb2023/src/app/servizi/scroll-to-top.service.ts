import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollToTopService {
  //Funzione Torna in Cima
  scrollToTop() {
    // Scrolla la pagina fino all'inizio
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Aggiunge un'animazione di scorrimento
    });
  }
}
