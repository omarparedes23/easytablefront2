import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { LocalService } from '../services/local.service';
import { take } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private apiservice: ApiService,
    private router: Router,
    private localStore: LocalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      motDePasse: [null],
      codePostal: [null],
      email: [null],
      nom: [null],
      prenom: [null],
      rue: [null],
      telephone: [null],
      ville: [null],
    });
  }

  onSubmitForm() {
    //this.reservationForm.value.clientId = this.clientid?.toString();
    this.apiservice
      .enregistrerClient(this.signupForm)
      .pipe(take(1))
      .subscribe(
        (data) => {
          console.log(data);
          this.localStore.saveData('clientid', data.id.toString());
          this.router.navigateByUrl('reservation');
        },
        (error) => {
          console.log(error);
          this.router.navigateByUrl('signup');
        }
      );
  }
}
