import { Component, OnInit, ViewChild } from '@angular/core';
import  User  from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('editProfile',{static:true}) ngForm:NgForm;

  loggedInUser: User = {} as User;  
  user: User |any;
  viewId :number |any;
  formChangesSubscription: any;
  canEdit:boolean;

  constructor(
    private authService: AuthService, 
    private _userService: UserService,  
    private router: Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.currentUser;
    console.log(this.loggedInUser);
    this.route.params.subscribe(params =>{
      this.viewId=params['id'];
    });
    this._userService.getUserById(this.viewId).subscribe(data=>{
      this.user=data;
      console.log(this.user);
      });
      
    
    this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(x => {
      if (document.getElementById('confirmUpdate')){ document.getElementById('confirmUpdate')?.remove()};
      if (document.getElementById('refuseUpdate')){ document.getElementById('refuseUpdate')?.remove()}
    })
  }

  ngAfterViewChecked(){
    if (this.loggedInUser.id===this.user.id){this.canEdit=true} else {this.canEdit=false}
  }

  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }

  allowUpdate(){
    let fs:HTMLElement = document.getElementById('fieldsetEdit')!;
    let submit:HTMLElement = document.getElementById('submitProfile')!;
    if (!fs.hasAttribute('disabled')){
      fs.setAttribute('disabled','');
      submit.setAttribute('hidden','');
    }
    else{
      fs.removeAttribute('disabled');
      submit.removeAttribute('hidden');
    }
  }

  onSubmit(editProfile:any){
    if (!document.getElementById('confirmUpdate')){
    let updateForm = editProfile.value;
      console.log(updateForm);
    this.user.firstName=updateForm.inputFirstName;
    this.user.lastName=updateForm.inputLastName;
    this.user.email = updateForm.inputEmail;
    this.user.phoneNumber = updateForm.inputPhoneNumber;
    this.user.address= updateForm.inputAddress;
    this.user.gender = updateForm.selectGender;
    this.user.aboutMe = updateForm.inputAboutMe;
    this.user.city = updateForm.inputCity;
    this.user.state = updateForm.inputState;
    this.user.postalCode = updateForm.inputPostalCode;
      console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      (data)=>this.user=data);
    this.confirmUpdate();
    this.allowUpdate();
    }
    else {
      this.refuseUpdate();
    }
  }

  confirmUpdate():void{
    let tag :HTMLElement = document.createElement('p');
    let text = document.createTextNode("Successfully updated profile!");
    tag.appendChild(text);
    tag.className='updateNotif';
    tag.setAttribute('id', 'confirmUpdate');
    document.getElementById("accountHeader")?.append(tag);
  }

  refuseUpdate():void{
    if (!document.getElementById('refuseUpdate')){
    let tag:HTMLElement = document.createElement('p');
    let text = document.createTextNode("You have already changed your profile");
    tag.appendChild(text);
    tag.className='updateNotif';
    tag.setAttribute('id','refuseUpdate');
    document.getElementById("accountHeader")?.append(tag);
    }
  }

  resetPassword():void{
    this.router.navigate(['/reset-password']);
  }
}
