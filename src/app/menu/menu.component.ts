import { Component, OnInit } from '@angular/core';
import { Irestaurant } from '../interface/irestaurant';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  restoid!: string | null;
  public restaurantsArray$!: Observable<Irestaurant>;
  constructor(
    private apiservice: ApiService,
    private router: Router,
    private localStore: LocalService
  ) {}
  ngOnInit(): void {
    this.restoid = this.localStore.getData('restoid');
    this.restaurantsArray$ = this.apiservice.getRestaurant(Number(this.restoid));
  }
}
