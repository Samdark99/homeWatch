import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Return true for all fields', () => {
    expect(component.userForm.contains('id')).toBeTruthy();
    expect(component.userForm.contains('email')).toBeTruthy();
    expect(component.userForm.contains('firstName')).toBeTruthy();
    expect(component.userForm.contains('lastName')).toBeTruthy();
    expect(component.userForm.contains('birthDate')).toBeTruthy();
    expect(component.userForm.contains('roleId')).toBeTruthy();
    expect(component.userForm.contains('createdAt')).toBeTruthy();
  });

  it('Email validator invalid', () => {
    const control = component.userForm.get('email');
    control.setValue('novalid');
    expect(control.valid).toBeFalsy();
  });

  it('First Name validator invalid', () => {
    const control = component.userForm.get('firstName');
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Last Name invalid', () => {
    const control = component.userForm.get('lastName');
    control.setValue('123456789012345678901234567890123456789012345678901231212');
    expect(control.invalid).toBeTruthy();
  });

  it('BirthDate required', () => {
    const control = component.userForm.get('birthDate');
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('ID requiered', () => {
    const control = component.userForm.get('id');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('Role Id requiered', () => {
    const control = component.userForm.get('roleId');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('CreatedAt requiered', () => {
    const control = component.userForm.get('createdAt');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
});
