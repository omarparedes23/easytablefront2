import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { Iclient } from '../interface/iclient';
import { Irestaurant } from '../interface/irestaurant';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { LocalService } from '../services/local.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class ReservationComponent implements OnInit {
  reservationForm!: FormGroup;
  public client$!: Observable<Iclient>;
  public restaurant$!: Observable<Irestaurant>;
  public restaurant2$!: Observable<Irestaurant>; //restaurant2
  restoid!: string | null;
  clientid!: string | null;

  constructor(
    private apiservice: ApiService,
    private router: Router,
    private localStore: LocalService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.restoid = this.localStore.getData('restoid');
    this.clientid = this.localStore.getData('clientid');
    this.client$ = this.apiservice.getClient(Number(this.clientid));
    this.restaurant$ = this.apiservice.getRestaurant(Number(this.restoid));

    this.restaurant2$ = this.apiservice.getRestaurant(Number(this.restoid));

    this.reservationForm = this.formBuilder.group({
      clientId: [null],
      dateReservation: [null],
      heureReservation: [null],
      nombrePersonnes: [null, Validators.required],
      tablerestaurantId: [null, Validators.required],
    });
  }

  onSubmitForm() {
    this.reservationForm.value.clientId = this.clientid?.toString();

    this.reservationForm.value.dateReservation = this.datePipe.transform(
      this.reservationForm.value.dateReservation,
      'dd-MM-yyyy'
    );

    this.apiservice
      .reserverTable(this.reservationForm)
      .pipe(take(1))
      .subscribe(
        (data) => {
          console.log(data);
          this.localStore.saveData(
            'datereservation',
            this.reservationForm.value.dateReservation
          );
          this.localStore.saveData(
            'heurereservation',
            this.reservationForm.value.heureReservation
          );
          this.localStore.saveData(
            'nombrepersonnes',
            this.reservationForm.value.nombrePersonnes
          );
          this.router.navigateByUrl('confirmation');
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
