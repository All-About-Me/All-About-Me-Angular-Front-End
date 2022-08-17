import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User = {} as User;
  

  constructor(
    private authService: AuthService, 
    private _userService: UserService,  
    private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser
  }

  onSubmit(editProfile:any){
    let updateForm = editProfile.value;
      console.log(updateForm);
    this.user.firstName=updateForm.inputFirstName;
    this.user.lastName=updateForm.inputLastName;
      console.log(this.user);
    this._userService.updateUser(this.user).subscribe(data=>this.user=data);
  }

  resetPassword():void{
    this.router.navigate(['/reset-password']);
  }
}
