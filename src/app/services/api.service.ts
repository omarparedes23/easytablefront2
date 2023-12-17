import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Irestaurant } from '../interface/irestaurant';
import { Iclient } from '../interface/iclient';
import { FormGroup } from '@angular/forms';
import { Ireservation } from '../interface/ireservation';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //urlIp: string = 'http://52.47.152.220:8080/easytable-0.0.1-SNAPSHOT';
  urlIp: string = '/api';
  private urlApirestaurants = this.urlIp + '/restaurant/restaurants';
  private urlApiclient = this.urlIp + '/client/1';
  private urlApireserver = this.urlIp + '/reservation/reserver';
  private urlApisignup = this.urlIp + '/client/creerCompte';

  constructor(private http: HttpClient) {}
  getRestaurants(): Observable<Irestaurant[]> {
    return this.http.get<Irestaurant[]>(this.urlApirestaurants);
  }

  getRestaurant(id: number): Observable<Irestaurant> {
    return this.http.get<Irestaurant>(this.urlIp + `/restaurant/${id}`);
  }
  getClient(id: number): Observable<Iclient> {
    return this.http.get<Iclient>(this.urlIp + `/client/${id}`);
  }
  authentifierClient(email: string, motdepasse: string) {
    return this.http.get<Iclient>(
      this.urlIp + `/client/${email}/${motdepasse}`
    );
  }
  reserverTable(reservationform: FormGroup) {
    return this.http.post<Ireservation>(
      this.urlApireserver,
      reservationform.value
    );
  }
  enregistrerClient(signupform: FormGroup) {
    return this.http.post<Iclient>(this.urlApisignup, signupform.value); //Icompte
  }
}
