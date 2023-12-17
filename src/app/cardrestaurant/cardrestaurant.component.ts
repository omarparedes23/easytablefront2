import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../services/local.service';
import { Irestaurant } from '../interface/irestaurant';

@Component({
  selector: 'app-cardrestaurant',
  templateUrl: './cardrestaurant.component.html',
  styleUrl: './cardrestaurant.component.scss',
})
export class CardrestaurantComponent implements OnInit {
  @Input() cardrestomodel!: Irestaurant;
  constructor(private router: Router, private localStore: LocalService) {}
  ngOnInit(): void {}
  onLogin(resto: Irestaurant): void {
    this.localStore.saveData('restoid', resto.id.toString());
    this.localStore.saveData('nomresto', resto.nom);
    this.localStore.saveData(
      'addressresto',
      resto.rue + ' ' + resto.ville + ' ' + resto.codePostal
    );
    this.localStore.saveData('telephoneresto', resto.telephone);
    this.router.navigateByUrl('login');
  }
  onMenu(resto: Irestaurant): void {
    this.localStore.saveData('restoid', resto.id.toString());
    this.router.navigateByUrl('menu');
  }
}
