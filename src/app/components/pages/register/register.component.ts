import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOGIN } from 'src/app/constants/paths';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService,
              private router: Router) { }
  
  registerForm: FormGroup;
  isIncorrect: boolean = false;
  
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'email': ['', [Validators.required,
                     Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"), 
                     Validators.maxLength(50)]],
      'firstName': ['', [Validators.required, Validators.maxLength(50)]],
      'lastName': ['', [Validators.required, Validators.maxLength(50)]],
      'birthDate': ['', Validators.required],
      'salt': ['']
    });
  }

  get emailInvalid(){
    return this.registerForm.get('email').invalid && this.registerForm.get('email').touched;
  }

  get firstNameInvalid(){
    return this.registerForm.get('firstName').invalid && this.registerForm.get('firstName').touched;
  }

  get lastNameInvalid(){
    return this.registerForm.get('lastName').invalid && this.registerForm.get('lastName').touched;
  }

  get birthDateInvalid(){
    return this.registerForm.get('birthDate').invalid && this.registerForm.get('birthDate').touched;
  }

  newRegister(){
    if(this.registerForm.invalid){
      return Object.values(this.registerForm.controls).forEach(control => {
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else{
          control.markAsTouched();
        }
      });
    }

    let body = this.registerForm.getRawValue();
    this.registerService.register(body)
      .subscribe((res) => {
        this.router.navigate([LOGIN]);
      },(err) => {
        console.log(err);
        this.isIncorrect = true;
        this.registerForm.markAsUntouched();
      });
  }

}
