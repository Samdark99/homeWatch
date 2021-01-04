import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Return true for all fields', () => {
    expect(component.registerForm.contains('id')).toBeTruthy();
    expect(component.registerForm.contains('email')).toBeTruthy();
    expect(component.registerForm.contains('firstName')).toBeTruthy();
    expect(component.registerForm.contains('lastName')).toBeTruthy();
    expect(component.registerForm.contains('birthDate')).toBeTruthy();
    expect(component.registerForm.contains('roleId')).toBeTruthy();
    expect(component.registerForm.contains('createdAt')).toBeTruthy();
  });

  it('Email validator invalid', () => {
    const control = component.registerForm.get('email');
    control.setValue('novalid');
    expect(control.valid).toBeFalsy();
  });

  it('First Name validator invalid', () => {
    const control = component.registerForm.get('firstName');
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Last Name invalid', () => {
    const control = component.registerForm.get('lastName');
    control.setValue('123456789012345678901234567890123456789012345678901231212');
    expect(control.invalid).toBeTruthy();
  });

  it('BirthDate required', () => {
    const control = component.registerForm.get('birthDate');
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Email requiered', () => {
    const control = component.registerForm.get('email');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('First Name requiered', () => {
    const control = component.registerForm.get('firstName');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('Last Name requiered', () => {
    const control = component.registerForm.get('lastName');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
});
