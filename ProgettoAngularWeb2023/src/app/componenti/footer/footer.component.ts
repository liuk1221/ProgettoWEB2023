import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  
  //Funzione Torna in Cima
  scrollToTop() {
    // Scrolla la pagina fino all'inizio
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Aggiunge un'animazione di scorrimento
    });
  }
}
