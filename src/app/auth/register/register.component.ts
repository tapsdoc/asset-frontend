import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registrationForm: FormGroup = this.authService.registrationForm;
  subs:Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.registerUser().subscribe(
      (response) => {
        console.log('Login successful:', response);
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }

  checkPasswords(group: FormGroup): null | object {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    return password.value === confirmPassword.value ? null : { mismatch: true };
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
