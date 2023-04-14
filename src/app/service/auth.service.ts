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

  private authUrl = `http://localhost:8080/api/v1/auth`;

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
    return this.http.post(`${this.authUrl}/register`, this.registrationForm.value).pipe(
      map((response: any) => {
        this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/login']).then();
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.authUrl}/login`, body).pipe(
      map((response: any) => {
        this.snackBar.open('Login successful!', 'Close', {duration: 3000});
        this.router.navigate(['/dashboard']).then();
      })
    );
  }
}
