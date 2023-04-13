import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'http://localhost:8080/api/v1/auth/register';

  registrationForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  }, { validator: this.checkPasswords });

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  checkPasswords(group: FormGroup): null | object {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    return password.value === confirmPassword.value ? null : { mismatch: true };
  }

  registerUser(): Observable<any> {
    return this.http.post(this.registerUrl, this.registrationForm.value).pipe(
      map((response: any) => {
        // Handle response from server here
        this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/login']).then();
      })
    );
  }
}
