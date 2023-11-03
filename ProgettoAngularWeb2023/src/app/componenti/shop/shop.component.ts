import {Component} from '@angular/core';
import { Category } from 'src/app/modelli/category';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})

export class ShopComponent {

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
  selectedCategory = this.category[0].value;                                //Inizializza la variabile per il two-way binding al valore "tutto"


  //MetodoDIVerifica - DEPRECATED
  ritornaSelected(){
    console.log(this.selectedCategory);
  }
}
