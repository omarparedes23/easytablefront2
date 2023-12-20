import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LocalService } from '../services/local.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  emailinput: boolean = false;
  motdePasseRegex!: RegExp;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiservice: ApiService,
    private localStore: LocalService
  ) {}
  ngOnInit(): void {
    this.motdePasseRegex = /^.{6,}$/;
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      motdepasse: [
        null,
        [Validators.required, Validators.pattern(this.motdePasseRegex)],
      ],
    });
  }
  onSubmitForm() {
    this.apiservice
      .authentifierClient(
        this.loginForm.value.email,
        this.loginForm.value.motdepasse
      )
      .pipe(take(1))
      .subscribe(
        (results) => {
          if (results.email === this.loginForm.value.email) {
            this.emailinput = true;
            this.localStore.saveData('clientid', results.id.toString());
            this.router.navigateByUrl('reservation');
          }
        },
        (error) => {
          console.log(error);
          this.router.navigateByUrl('login');
        }
      );
  }
  onCreationForm() {
    this.router.navigateByUrl('signup');
  }
}
