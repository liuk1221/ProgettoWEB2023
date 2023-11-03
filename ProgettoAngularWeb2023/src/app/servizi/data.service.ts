import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Prodotti } from '../modelli/prodotti';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }           //Iniezione di FireStore nel servizio

  //Aggiungi Prodotto
  addProduct(prodotto: Prodotti){
    prodotto.id = this.afs.createId();                                                                   //Crea un ID univoco per quel determinato prodotto.
    return this.afs.collection('/Prodotti/'+prodotto.category).add(prodotto);                            //Aggiunge nella tab prodotti/cat il prodotto
  }

  //Get di tutti gli studenti
  getAllProduct(){
    return this.afs.collection('/Prodotti').snapshotChanges();
  }

  //Cancellazione Prodotto
  delProduct(prodotto: Prodotti){
    return this.afs.doc('/Prodotti/'+prodotto.id).delete();
  }

  //Aggiorna Prodotto
  updateProduct(prodotto: Prodotti){
    this.delProduct(prodotto);
    this.addProduct(prodotto);
  }
}
