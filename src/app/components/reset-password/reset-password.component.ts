import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  user: User = {} as User;  

  constructor(
    private authService: AuthService, 
    private _userService: UserService,  
    private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser
  }

  onCall(pwdForm:any){
    let updateForm = pwdForm.value;
      console.log(updateForm);
    
      this.user.password=updateForm.newPassword;

      console.log(this.user);
      this.authService.resetPassword(this.user).subscribe(
        (data)=>this.user=data);
      let tag :HTMLElement = document.createElement('p');
      let text = document.createTextNode("Successfully updated password!");
      tag.appendChild(text);
      document.getElementById("edit")?.appendChild(tag);
    /*if(this.user.password===updateForm.currentPassword){
      this.user.password=updateForm.newPassword;

      console.log(this.user);
      this._userService.updateUser(this.user).subscribe(
        (data)=>this.user=data);
      let tag :HTMLElement = document.createElement('p');
      let text = document.createTextNode("Successfully updated password!");
      tag.appendChild(text);
      document.getElementById("edit")?.appendChild(tag);
    }*/
   
    
  }

}
