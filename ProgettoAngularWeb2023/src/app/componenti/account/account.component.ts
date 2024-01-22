import { Component, DoCheck, OnInit } from '@angular/core';
import { Ordini } from 'src/app/modelli/ordini';
import { AuthService } from 'src/app/servizi/auth.service';
import { OrderService } from 'src/app/servizi/order.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, DoCheck{

  constructor(public auth : AuthService, private order : OrderService){}
  
  //Ciclo di vita del componente
  ngDoCheck(): void {
    this.filtraOrdini();
  }
  ngOnInit(): void {
    this.getAllOrders();
  }



  //Variabili
  listaOrdini: Ordini [] = []
  listaOrdiniFiltrati: Ordini [] = []

  //Metodo per ottenere tutti gli ordini
  getAllOrders(){
    this.order.getAllOrders().subscribe(res => {
      this.listaOrdini = res.map((e:any) => {
        const order = e.payload.doc.data();
        order.id = e.payload.doc.id;
        return order;
      })
    }, err => {
      alert('Errore durante il fetch degli ordini.');
    })
  }

  //Metodo per filtrare gli ordini in base all'utente autenticato.
  filtraOrdini(){
    this.listaOrdiniFiltrati = this.listaOrdini.filter(Object => {
      return Object.utente.toLowerCase() === this.auth.userEmail.toLowerCase()
    })
  }
  //Metodo per eliminare un ordine effettuato
  delOrder(ordine : Ordini){
    if(window.confirm('Sei sicuro di voler eliminare questo ordine? id:'+ordine.id))
    this.order.delOrder(ordine)
  }
}
