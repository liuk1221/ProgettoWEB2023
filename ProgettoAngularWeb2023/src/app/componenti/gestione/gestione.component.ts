import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/modelli/category';
import { Prodotti } from 'src/app/modelli/prodotti';
import { AuthService } from 'src/app/servizi/auth.service';
import { DataService } from 'src/app/servizi/data.service';


@Component({
  selector: 'app-gestione',
  templateUrl: './gestione.component.html',
  styleUrls: ['./gestione.component.scss']
})
export class GestioneComponent implements OnInit{

  listaProdotti: Prodotti[] = [];
  oggettoProdotto: Prodotti = {
    id: '',
    category: '',
    nome: '',
    qta: undefined
  }

  category: string = '';
  nome: string = '';
  qta: number = 0;

  //GESTIONE DEL FORM
  productform!: FormGroup //Creaiamo un gruppo di controlli. Ogni campo di un form è detto form control. Tanti form control fanno un form group.

  constructor(private auth : AuthService, private data : DataService){}


  //OnInit
  ngOnInit(): void {
    this.productform = new FormGroup({
      nome: new FormControl(null, Validators.required), //Tra le parentesi posso anche aggiungere un valore iniziale e i validatori
      categoria: new FormControl(null, [Validators.required]),
      quantita: new FormControl(null, [Validators.required])
    });
    this.getAllProducts();
  }

  //MetodiImplementativi
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

  addProduct(){
    this.oggettoProdotto.id = '';
    this.oggettoProdotto.category = this.category;
    this.oggettoProdotto.nome = this.nome;
    this.oggettoProdotto.qta = this.qta

    this.data.addProduct(this.oggettoProdotto);
    alert('Il prodotto è stato inserito con successo!')
  }


  delProduct(prodotto : Prodotti){
    if(window.confirm('Sei sicuro di voler eliminare il prodotto: '+prodotto.nome+' ?'))
    this.data.delProduct(prodotto)
  }




  



  onSubmit(){
    //Log di quello che è stato inviato al DB
    console.log(this.productform)

    //Assegnazione campi form alle variabili locali
    this.category = this.productform.value.categoria;
    this.nome = this.productform.value.nome;
    this.qta = this.productform.value.quantita;

    //TEST
    // console.log(this.oggettoProdotto.category)
    // console.log(this.oggettoProdotto.nome)
    // console.log(this.oggettoProdotto.qta)

    //Aggiunge il prodotto al DB
    this.addProduct();

    // Dopo aver processato il form, reimposta il form ai valori iniziali
    this.productform.reset(); // reimposta il form vuoto
  }

  //CATEGORIE FORM
  categorys: Category[] = [
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
  selectedCategory = this.categorys[0].value;                                //Inizializza la variabile per il two-way binding al valore "tutto"



  //TABELLA e GESTIONE

}
