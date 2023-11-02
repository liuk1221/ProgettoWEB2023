import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { ScrollToTopService } from 'src/app/servizi/scroll-to-top.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  
  constructor(library: FaIconLibrary, public scroll: ScrollToTopService) {
    library.addIcons(faFacebook, faInstagram, faTwitter, faLinkedin);
  }
}
