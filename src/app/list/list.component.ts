import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Irestaurant } from '../interface/irestaurant';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { LocalService } from '../services/local.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  public restaurantsArray$!: Observable<Irestaurant[]>;
  //myResto!: CardRestoModel;
  //myRestos!: Irestaurant[]; //CardRestoModel

  constructor(
    private apiservice: ApiService,
    private router: Router,
    private localStore: LocalService
  ) {}
  ngOnInit(): void {
    //this.myRestos = this.apiservice.getAllRestaurants();
    this.restaurantsArray$ = this.apiservice.getRestaurants();
  }
}
