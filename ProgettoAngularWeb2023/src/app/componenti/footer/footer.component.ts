import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  
  constructor(library: FaIconLibrary) {
    library.addIcons(faFacebook, faInstagram, faTwitter, faLinkedin);
  }


  //Funzione Torna in Cima
  scrollToTop() {
    // Scrolla la pagina fino all'inizio
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Aggiunge un'animazione di scorrimento
    });
  }
}
