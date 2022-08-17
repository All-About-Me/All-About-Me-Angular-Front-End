import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  user: User = {} as User;
  router:Router;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser
  }

  

}
