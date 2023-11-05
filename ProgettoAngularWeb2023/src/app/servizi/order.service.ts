import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Ordini } from '../modelli/ordini';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private afs : AngularFirestore) {}

  //Aggiungi Ordine
  addOrder(ordine : Ordini){
    ordine.id = this.afs.createId();                                                                   //Crea un ID univoco per quel determinato ordine.
    return this.afs.collection('/Ordini').add(ordine);                                                 
  }

  //Get di tutti gli ordini
  getAllOrders(){
    return this.afs.collection('/Ordini').snapshotChanges();                                            //Tipo valueChanges ma consente anche dei controlli più specifici sul monitoraggio dei dati
  }

  //Metodo per prendere i dati di un prodotto dato il suo id.
  //Utilizzato principalmente nel componente di acquisto.
  getOrderById(orderId: string) {
    return this.afs.doc('/Ordini' + orderId).valueChanges();                                         //Con valueChanges posso controllare in tempo reale il database. Più semplice di snapshotChanges
  }


  //Cancellazione Prodotto
  delOrder(ordine: Ordini){
    return this.afs.doc('/Ordini'+ordine.id).delete();
  }
}
