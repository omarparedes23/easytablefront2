import { Imenu } from './imenu';
import { Itablerestaurant } from './itablerestaurant';

export interface Irestaurant {
  id: number;
  nom: string;
  rue: string;
  ville: string;
  codePostal: string;
  telephone: string;
  email: string;
  presentation: string;
  restaurant_type: string;
  url: string;
  tableRestaurants: Itablerestaurant[];
  menus: Imenu[];
}
