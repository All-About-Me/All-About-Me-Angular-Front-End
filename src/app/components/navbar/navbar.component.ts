import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  dark:boolean = true;
  user: User = {} as User;  
  
  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  darkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }

  lightTheme(): void {
    document.body.classList.toggle('light-theme');
  }

  viewProfile(): void {
    this.router.navigate(['/profile-page/'+this.authService.currentUser.id]);
  }

}



