import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import User from "src/app/models/User";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit {
  user: User = {} as User;
  info:boolean = false;
  notice:String;
  constructor(
    private authService: AuthService,
    private _userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUser;
  }

  onCall(pwdForm: any) {
    let updateForm = pwdForm.value;
    console.log(updateForm);
    if (this.user.password === updateForm.currentPassword) {
      if(updateForm.currentPassword === updateForm.newPassword) {
        this.info=true;
        this.notice = "Cannot be the same password!";
      }
      else {
      this.user.password = updateForm.newPassword;
      //console.log(this.user);
      this.authService
        .resetPassword(this.user)
        .subscribe((data) => (this.user = data));
        // alert("Password Updated");
        this.info=true;
        this.notice = "Password is updated!";
      //let tag: HTMLElement = document.createElement("p");
      //let text = document.createTextNode("Successfully updated password!");
      //tag.appendChild(text);
      //document.getElementById("edit")?.appendChild(tag);
      }
    } else {
      // alert("Current Password Incorect");
      this.info=true;
      this.notice = "Current password incorect!";
    }
  }
}
