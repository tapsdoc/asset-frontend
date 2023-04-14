import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup = this.authService.registrationForm;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.registerUser().subscribe();
  }

  checkPasswords(group: FormGroup): null | object {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    return password.value === confirmPassword.value ? null : { mismatch: true };
  }
}
