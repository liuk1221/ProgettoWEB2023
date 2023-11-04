import { Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  


  immagini = [
    {src: '../../../assets/HomePageImages/DivSecCategorie/selle.png', testo: 'SELLE', mostraIlTesto: false, value: "selle" },
    {src: '../../../assets/HomePageImages/DivSecCategorie/sottopancia.jpg', testo: 'SOTTOPANCIA', mostraIlTesto: false, value: "sottopancia"  },
    {src: '../../../assets/HomePageImages/DivSecCategorie/sottosella.jpg', testo: 'SOTTOSELLA', mostraIlTesto: false, value: "sottosella"  },
    {src: '../../../assets/HomePageImages/DivSecCategorie/pettorali.jpg', testo: 'PETTORALI', mostraIlTesto: false, value: "pettorali"  },
    {src: '../../../assets/HomePageImages/DivSecCategorie/testiere.jpg', testo: 'TESTIERE', mostraIlTesto: false, value: "testiere"  },
    {src: '../../../assets/HomePageImages/DivSecCategorie/redini.jpg', testo: 'REDINI', mostraIlTesto: false, value: "redini"  },
    {src: '../../../assets/HomePageImages/DivSecCategorie/staffili.jpg', testo: 'STAFFILI', mostraIlTesto: false, value: "staffili"  },
    {src: '../../../assets/HomePageImages/DivSecCategorie/staffe.jpg', testo: 'STAFFE', mostraIlTesto: false, value: "staffe"  },
    {src: '../../../assets/HomePageImages/DivSecCategorie/protezioni.png', testo: 'PROTEZIONI', mostraIlTesto: false, value: "protezioni"  },
    {src: '../../../assets/HomePageImages/DivSecCategorie/cap.jpg', testo: 'CAP', mostraIlTesto: false, value: "cap"  }
  ]


  //Funzioni per lo zoom delle immagini
  zoomIn(event: MouseEvent) {
    const immagine = event.target as HTMLImageElement;
    immagine.style.transform = 'scale(1.2)';                // Modifica il valore per controllare il livello di zoom
    immagine.style.filter = 'grayscale(100%)'+'blur(1px)';  //Trasforma in bianco e nero e filtra con effetto blur
  }

  zoomOut(event: MouseEvent) {
    const immagine = event.target as HTMLImageElement;
    immagine.style.transform = 'scale(1)';
    immagine.style.filter = 'grayscale(0%)';                //Trasforma a colori
  }

  //Funzioni per mostrare o meno il testo nelle immagini
  mostraTesto(item){
    item.mostraIlTesto=true;
  }
  nascondiTesto(item){
    item.mostraIlTesto=false;
  }


}
