import {Component, DoCheck, OnInit} from '@angular/core';
import { Category } from 'src/app/modelli/category';
import { Prodotti } from 'src/app/modelli/prodotti';
import { AuthService } from 'src/app/servizi/auth.service';
import { DataService } from 'src/app/servizi/data.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})

export class ShopComponent implements OnInit, DoCheck{

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


  //MetodoDIVerifica - DEPRECATED
  ritornaSelected(){
    console.log(this.selectedCategory);
    console.log(this.listaProdotti);
    console.log(this.listaProdottiFiltrati);
  }

  listaProdotti: Prodotti[] = [];
  listaProdottiFiltrati: Prodotti[] = [];

  constructor(private auth : AuthService, private data : DataService){}
  
  //Viene lanciato ogni volta che vengono rilevati dei cambiamenti
  ngDoCheck(): void {
    this.filtraProdotti();                                              //Aggiorna l'array dei prodottiFIltrati
  }
  
  //Viene lanciato all'avvio del componente
  ngOnInit(): void {
    this.getAllProducts();
  }

  //MetodiImplementativi

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
}
