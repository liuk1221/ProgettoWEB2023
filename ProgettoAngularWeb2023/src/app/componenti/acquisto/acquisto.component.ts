import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Prodotti } from 'src/app/modelli/prodotti';
import { BuyService } from 'src/app/servizi/buy.service';
import { DataService } from 'src/app/servizi/data.service';

@Component({
  selector: 'app-acquisto',
  templateUrl: './acquisto.component.html',
  styleUrls: ['./acquisto.component.scss']
})
export class AcquistoComponent implements OnInit{

  constructor(private buy: BuyService, private data : DataService) {}
  
  ngOnInit(): void {
    this.getProductById(this.buy.idAcquisto);         //CARICA I DATI NELLE VARIABILI LOCALI
  }

  //Variabili Locali
  nome: string ='';
  categoria: string='';
  qnt: number=undefined;
  id: string= this.getId();

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

}
