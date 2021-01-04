import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HOME } from 'src/app/constants/paths';
import { LogInService } from 'src/app/services/log-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isIncorrect: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private loginService: LogInService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(13)]]
    });
  }

  get usernameInvalid(){
    return this.loginForm.get('username').invalid && this.loginForm.get('username').touched;
  }

  get passwordInvalid(){
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
  }

  login(){
    if(this.loginForm.invalid){
      return Object.values(this.loginForm.controls).forEach(control => {
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else{
          control.markAsTouched();
        }
      });
    }

    let body = this.loginForm.value;
    this.loginService.login(body.username, body.password)
      .subscribe((res) => {
        localStorage.setItem("token", JSON.stringify(res));
        this.router.navigate([HOME]);
      },() => {
        console.log("Hubo un error");
        this.isIncorrect = false;
        this.loginForm.markAsUntouched();
      });
  }
}
