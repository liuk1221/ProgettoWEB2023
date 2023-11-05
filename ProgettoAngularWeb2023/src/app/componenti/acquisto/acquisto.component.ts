import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Prodotti } from 'src/app/modelli/prodotti';
import { AuthService } from 'src/app/servizi/auth.service';
import { BuyService } from 'src/app/servizi/buy.service';
import { DataService } from 'src/app/servizi/data.service';

@Component({
  selector: 'app-acquisto',
  templateUrl: './acquisto.component.html',
  styleUrls: ['./acquisto.component.scss']
})
export class AcquistoComponent implements OnInit{

  //Costruttore e varie iniezioni
  constructor(private buy: BuyService, private data : DataService, private auth : AuthService) {}
  
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

  //Variabili Locali
  nome: string ='';
  categoria: string='';
  qnt: number=undefined;    //Quantita massima disponibile
  id: string= this.getId();

  //Variabile nuova quantità
  qta: number=undefined;

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
    this.oggettoProdotto.qta = this.qta;                //ATTENZIONE: La quantità è la nuova quantità da inserire validata dal formControl
    this.oggettoProdotto.category = this.categoria;

    this.data.updateProduct(this.oggettoProdotto);
    alert('Ordine evaso con successo!');
  }

  //Metodo OnSubmit per la gestione della quantità.
  onSubmit(){
    //Log di quello che è stato inviato al DB
    console.log(this.productform)
    //Assegnazione campi form alle variabili locali
    this.qta = this.productform.value.quantita;
    //Aggiorna il prodotto nel DB
    this.updateProduct();
    // Dopo aver processato il form, reimposta il form ai valori iniziali
    this.productform.reset(); // reimposta il form vuoto
  }
}
