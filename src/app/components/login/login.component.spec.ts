import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { delay, of } from 'rxjs';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let location: Location;
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        {path:'register', component:LoginComponent}
      ]), ReactiveFormsModule],
      declarations: [ LoginComponent ],
      providers:[AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('TestBed should be Truthy', () => {
    expect(TestBed).toBeTruthy();
  });

  it('submit should reject no information', () =>{
    expect(component.loginForm.valid).toBeTruthy();
  })

  it('should navigate to register', fakeAsync(() =>{
    component.register();
    tick();
    expect(location.path()).toBe('/register')
  }));

  it('submit should call Login', ()=>{  
    component.onSubmit(new Event('click'));
    fixture.detectChanges()
    expect(component.onSubmit(new Event('click'))).toBeFalsy();
  })
});
