import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

import { RegisterComponent } from './register.component';

const user = new User(5,"testuser@gmail.com",'Test','User','','','','','','',8,'password')


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service:AuthService
  let location:Location;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([{ path: "login", component: RegisterComponent }]), FormsModule, ReactiveFormsModule],
      declarations: [ RegisterComponent ],
      providers: [AuthService, Location]
    })
    .compileComponents();
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthService);
    location =TestBed.inject(Location)
    
    spyOn(service, 'register').and.callFake(() => of(user))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should register a user', fakeAsync( () => {
    const registerFormGroup = component.registerForm;

    registerFormGroup.get('firstName')?.setValue('Test')
    registerFormGroup.get('lastName')?.setValue('User')
    registerFormGroup.get('email')?.setValue('testuser@gmail.com')
    registerFormGroup.get('password')?.setValue('password')
    component.onSubmit(new Event('click'))
    fixture.detectChanges();
    tick()
    expect(location.path()).toContain('login')
  }));
});
