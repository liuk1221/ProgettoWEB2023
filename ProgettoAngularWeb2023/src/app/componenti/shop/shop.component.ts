import {Component, DoCheck, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/modelli/category';
import { Prodotti } from 'src/app/modelli/prodotti';
import { AuthService } from 'src/app/servizi/auth.service';
import { BuyService } from 'src/app/servizi/buy.service';
import { DataService } from 'src/app/servizi/data.service';
import { FotoService } from 'src/app/servizi/foto.service';
import { ScrollToTopService } from 'src/app/servizi/scroll-to-top.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})

export class ShopComponent implements OnInit, DoCheck{
  //-----------------------------------------------------------------------------------------------------------------
  //Costruttore
  constructor(private auth : AuthService, private data : DataService, private router: Router, private scroll : ScrollToTopService, private buy : BuyService, private foto : FotoService){} //Iniezioni generali

  //-----------------------------------------------------------------------------------------------------------------
  //Dichiarazione Array e Variabili
  category: Category[] = [
    {value: 'tutto', viewValue: 'Tutto'},
    {value: 'selle', viewValue: 'Selle'},
    {value: 'sottopancia', viewValue: 'Sottopancia'},
    {value: 'sottosella', viewValue: 'Sottosella'},
    {value: 'pettoriali', viewValue: 'Pettorali'},
    {value: 'testiere', viewValue: 'Testiere'},
    {value: 'redini', viewValue: 'Redini'},
    {value: 'staffili', viewValue: 'Staffili'},
    {value: 'staffe', viewValue: 'Staffe'},
    {value: 'protezioni', viewValue: 'Protezioni'},
    {value: 'cap', viewValue: 'Cap'}
  ];
  selectedCategory = this.category[0].value                                //Inizializza la variabile per il two-way binding al valore "tutto"
  urlCorrente: string
  listaProdotti: Prodotti[] = [];
  listaProdottiFiltrati: Prodotti[] = [];



  //MetodoDIVerifica - DEPRECATED
  // ritornaSelected(){
  //   console.log(this.selectedCategory);
  //   console.log(this.listaProdotti);
  //   console.log(this.listaProdottiFiltrati);
  // }

  //-----------------------------------------------------------------------------------------------------------------
  //GESTIONE CICLO DI VITA DEL COMPONENTE
  //Viene lanciato ogni volta che vengono rilevati dei cambiamenti
  ngDoCheck(): void {
    this.filtraProdotti();                                              //Aggiorna l'array dei prodottiFIltrati
  }
  
  //Viene lanciato all'avvio del componente
  ngOnInit(): void {
    this.getAllProducts();
    this.scroll.scrollToTop();

    //Lettura URL e aggiornamento selected category
    //Questa sezione è necessaria a far si che i link alle categorie della HomePage siano funzionanti
    this.urlCorrente = this.router.url;
    const urlParts = this.urlCorrente.split('/');
    const ultimaParte = urlParts[urlParts.length - 1];
    this.selectedCategory = ultimaParte;
  }

  //-----------------------------------------------------------------------------------------------------------------
  //METODI
  //Ottieni tutti i prodotti dal db
  getAllProducts(){
    this.data.getAllProduct().subscribe(res => {
      this.listaProdotti = res.map((e : any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Errore durante il fetch dei dati.');
    })
  }

  //Carica nel nuovo array di oggetti solo gli oggetti filtrati a seconda del form
  //nella precedente implementazione l'errore stava nel non utilizzare OBJ
  filtraProdotti(){
    this.listaProdottiFiltrati = this.listaProdotti.filter(Object =>{
      return Object.category === this.selectedCategory.toString()
    })
  }


  //Metodo per l'aggiornamento dell'indirizzo a seconda del filtro applicato.
  selezionaCategoria(){
    this.router.navigate(['/shop', this.selectedCategory]);
  }


  //Metodo per l'invio dell'ID dell'oggetto selezionato al componente shopNow attraverso il servizio Buy
  inviaDati(d: string){
    this.buy.idAcquisto = d;
  }

  //Per Ottenere il percorso del servizio delle foto
  getPercorso(nome : string){
    return this.foto.getPercorso(nome)
  }
}
