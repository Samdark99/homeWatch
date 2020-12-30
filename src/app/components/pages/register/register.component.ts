import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInService } from 'src/app/services/log-in.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private logInService: LogInService,
              private router: Router) { }
  
  registerForm: FormGroup;
  
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'email': ['', [Validators.required,
                     Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"), 
                     Validators.maxLength(50)]],
      'firstName': ['', [Validators.required, Validators.maxLength(50)]],
      'lastName': ['', [Validators.required, Validators.maxLength(50)]],
      'birthDate': ['', Validators.required]
    });
  }

  get emailInvalid(){
    return this.registerForm.get('email').invalid && this.registerForm.get('email').touched;
  }

  register(){

  }

}
