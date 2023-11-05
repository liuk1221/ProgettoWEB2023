import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ordini } from 'src/app/modelli/ordini';
import { Prodotti } from 'src/app/modelli/prodotti';
import { AuthService } from 'src/app/servizi/auth.service';
import { BuyService } from 'src/app/servizi/buy.service';
import { DataService } from 'src/app/servizi/data.service';
import { OrderService } from 'src/app/servizi/order.service';

@Component({
  selector: 'app-acquisto',
  templateUrl: './acquisto.component.html',
  styleUrls: ['./acquisto.component.scss']
})
export class AcquistoComponent implements OnInit{

  //Costruttore e varie iniezioni
  constructor(private buy: BuyService, private data : DataService, private auth : AuthService, private order : OrderService) {}
  
  //VARIABILI
  //GESTIONE DEL FORM
  productform!: FormGroup //Creaiamo un gruppo di controlli. Ogni campo di un form è detto form control. Tanti form control fanno un form group.
  //VARIABILI DI GESTIONE DELL'UPDATE
  oggettoProdotto: Prodotti = {
    id: '',
    category: '',
    nome: '',
    qta: undefined
  }
   //Variabili Locali
   nome: string ='';
   categoria: string='';
   qnt: number=undefined;    //Quantita massima disponibile
   id: string= this.getId();
 
   //Variabile nuova quantità
   qta: number=undefined;
   //VARIABILI DI GESTIONE DEGLI ORDINI
   oggettoOrdine: Ordini = {
    id: '',
    idProdotto: '',
    categoryProdotto: '',
    nomeProdotto: '',
    qtaProdotto: undefined,
    utente: ''
   }

  ngOnInit(): void {
    this.getProductById(this.buy.idAcquisto);         //CARICA I DATI NELLE VARIABILI LOCALI
    //Gestione del form
    this.productform = new FormGroup({
      quantita: new FormControl(null, [Validators.required, this.validaQuantita.bind(this)])
    });
  }
  //Funzione di validazione del form.
  validaQuantita(control: FormControl){
    if(control.value !== null && control.value > this.qnt){
      return {quantitaMaggioreMassimo: true};
    }
    return null;
  }

  //Metodo per ottenere l'ID dell'oggetto desiderato
  getId(){
    return this.buy.idAcquisto;
  }


  //E' importante specificare il tipo Prodotti, altrimenti non posso accedere ai campi desiderati.
  getProductById(id : string){
    this.data.getProductById(id).subscribe((productData: Prodotti) => {
      this.nome = productData.nome;
      this.categoria = productData.category;
      this.qnt = productData.qta;
    });
  }

  //Metodo di aggiornamento del prodotto.
  updateProduct(){
    //Carica tutto nella oggetto prodotto
    this.oggettoProdotto.id = this.id;
    this.oggettoProdotto.nome = this.nome;
    this.oggettoProdotto.qta = this.qnt-this.qta;                //ATTENZIONE: La quantità è la nuova quantità da inserire validata dal formControl
    this.oggettoProdotto.category = this.categoria;

    this.data.updateProduct(this.oggettoProdotto);
    console.log('Prodotto correttamente aggiornato nel DB');
  }

  //Implementazione metodi per la gestione degli ordini
  addOrder(){
    this.oggettoOrdine.id = '';
    this.oggettoOrdine.idProdotto = this.id;
    this.oggettoOrdine.nomeProdotto = this.nome;
    this.oggettoOrdine.qtaProdotto = this.qta;
    this.oggettoOrdine.categoryProdotto = this.categoria;
    this.oggettoOrdine.utente = this.auth.userEmail;
    this.order.addOrder(this.oggettoOrdine);
    alert('Ordine registrato con successo!');
  }




  //Metodo OnSubmit per la gestione della quantità.
  onSubmit(){
    //Log di quello che è stato inviato al DB
    console.log(this.productform)
    //Assegnazione campi form alle variabili locali
    this.qta = this.productform.value.quantita;
    //Aggiorna il prodotto nel DB
    this.updateProduct();
    this.addOrder();
    // Dopo aver processato il form, reimposta il form ai valori iniziali
    this.productform.reset(); // reimposta il form vuoto
  }
}
