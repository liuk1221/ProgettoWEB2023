import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Prodotti } from '../modelli/prodotti';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) {}                                                         //Iniezione di FireStore nel servizio

  //Aggiungi Prodotto
  addProduct(prodotto: Prodotti){
    prodotto.id = this.afs.createId();                                                                   //Crea un ID univoco per quel determinato prodotto.
    return this.afs.collection('/Prodotti').add(prodotto);                                               //Aggiunge nella tab prodotti
  }
  // "/'+prodotto.category"
  //Get di tutti i prodotti
  getAllProduct(){
    return this.afs.collection('/Prodotti').snapshotChanges();                                            //Tipo valueChanges ma consente anche dei controlli più specifici sul monitoraggio dei dati
  }

  //Metodo per prendere i dati di un prodotto dato il suo id.
  //Utilizzato principalmente nel componente di acquisto.
  getProductById(productId: string) {
    return this.afs.doc('/Prodotti/' + productId).valueChanges();                                         //Con valueChanges posso controllare in tempo reale il database. Più semplice di snapshotChanges
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
