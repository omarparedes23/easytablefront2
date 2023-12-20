import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, take } from 'rxjs';
import { Iclient } from '../interface/iclient';
import { Irestaurant } from '../interface/irestaurant';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { LocalService } from '../services/local.service';
import { DatePipe } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class ReservationComponent implements OnInit {
  reservationForm!: FormGroup;
  public client$!: Observable<Iclient>;
  public restaurant$!: Observable<Irestaurant>;
  public restaurant2$!: Observable<Irestaurant>;
  restoid!: string | null;
  clientid!: string | null;
  numberRegex!: RegExp;

  constructor(
    private apiservice: ApiService,
    private router: Router,
    private localStore: LocalService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.numberRegex = /^[0-9]*$/;
    this.restoid = this.localStore.getData('restoid');
    this.clientid = this.localStore.getData('clientid');
    this.client$ = this.apiservice.getClient(Number(this.clientid));
    this.restaurant$ = this.apiservice.getRestaurant(Number(this.restoid));

    this.restaurant2$ = this.apiservice.getRestaurant(Number(this.restoid));

    this.reservationForm = this.formBuilder.group({
      clientId: [null],
      dateReservation: [null, [Validators.required, this.dateValidator()]],
      heureReservation: [null, Validators.required],
      nombrePersonnes: [
        null,
        [Validators.required, this.personnesValidation.bind(this)],
      ],
      tablerestaurantId: [null, Validators.required],
    });
  }
  //[Validators.required, Validators.pattern(this.numberRegex)]

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
  ///
  dateValidator() {
    return (control: AbstractControl) => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
      const minDate = new Date();
      const maxDate = new Date();
      maxDate.setDate(minDate.getDate() + 60);
      if (selectedDate < minDate || selectedDate > maxDate) {
        return { invalidDate: true };
      }
      return null;
    };
  }
  personnesValidation(control: FormControl) {
    const personnesValue = control.value;
    if (
      personnesValue !== null &&
      (isNaN(personnesValue) || personnesValue <= 0 || personnesValue >= 12)
    ) {
      return { personnesValueValidation: true };
    }
    return null;
  }
}
