import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ADMIN } from 'src/app/constants/paths';
import { User } from 'src/app/core/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  name: string;

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router) {
                this.inicialUser();
  }
  
  userForm: FormGroup;
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.usersService.getUser(id)
        .subscribe((user: User) => {
          this.name = user.firstName;
          this.loadData(user);
        });
    } else{
      this.loadData(null);
    }
  }

  get emailInvalid(){
    return this.userForm.get('email').invalid && this.userForm.get('email').touched;
  }

  get firstNameInvalid(){
    return this.userForm.get('firstName').invalid && this.userForm.get('firstName').touched;
  }

  get lastNameInvalid(){
    return this.userForm.get('lastName').invalid && this.userForm.get('lastName').touched;
  }

  get birthDateInvalid(){
    return this.userForm.get('birthDate').invalid && this.userForm.get('birthDate').touched;
  }

  inicialUser(){
    this.userForm = this.formBuilder.group({
      id: [{value: '', disabled: true}, [Validators.required]],
      email: ['', [Validators.required,
                   Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"),
                   Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      birthDate: ['', [Validators.required]],
      roleId: [{value: '', disabled: true}, [Validators.required]],
      createdAt: [{value: '', disabled: true}, [Validators.required]] 
    });
  }

  loadData(user: any){
    if(user !== null){
      this.userForm.reset({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: new Date(user.birthDate),
        roleId: user.roleId,
        createdAt: user.createdAt
      });
    } else{
      this.userForm.reset({
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        roleId: '',
        createdAt: ''
      });
    }
  }

  modifiedUser(){
    if(this.userForm.invalid){
      return;
    }

    let id = this.userForm.get('id').value;
    let body = this.userForm.getRawValue();
    this.usersService.updateUser(id, body)
      .subscribe(res => {
        console.log(res);
        this.router.navigate([ADMIN]);
      });
  }
}
