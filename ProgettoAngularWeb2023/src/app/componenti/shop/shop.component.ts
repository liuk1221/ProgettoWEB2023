import {Component} from '@angular/core';

//Interfaccia per le categorie
interface Category{
  value: String;
  viewValue: String;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})

export class ShopComponent {

  category: Category[] = [
    {value: 'all', viewValue: 'Tutto'},
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
  selectedCategory = this.category[0].value;



}
