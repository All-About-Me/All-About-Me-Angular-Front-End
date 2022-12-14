import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import User from "src/app/models/User";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { FollowerService } from "../../services/follower.service";
import { Observable, Observer } from "rxjs";
import { EventListenerFocusTrapInertStrategy } from "@angular/cdk/a11y";
import { platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { ProfanityFilterService } from "../../services/profanity-filter.service";
import { LocationService } from "../../services/location.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit{
  @ViewChild("editProfile", { static: true }) ngForm: NgForm;

  loggedInUser: User = {} as User;
  user: User;
  viewId: number | any;
  formChangesSubscription: any;
  canEdit:boolean;
  followList:User[] = [] as User[];
  isFollowing:boolean;
  followList$: Observable<User[]>;
  user$=new Observable<User>;

  followers:User[] = [] as User[];
  followers$: Observable<User[]>;
  viewFollowing:boolean=false;
  viewFollowers:boolean=false;
  states:string[]

  constructor(
    private authService: AuthService,
    private _userService: UserService,
    private _followerService: FollowerService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private profanityFilterService:ProfanityFilterService,
    private locationService:LocationService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
      
  };
  
  }

  ngOnInit(): void {
    if(this.authService.currentUser){
    this.loggedInUser= this.authService.currentUser
    }else if(this.authService.currentUser==undefined){
    }
    this.route.params.subscribe((params) => {
      this.viewId = params["id"];
    });
    this.user$ =this._userService.getUserById(this.viewId)
    this.user$.subscribe((data) => {
      this.user = data;
    });

    this.followList$=this._followerService.getFollows(this.loggedInUser)
    this.followList$.subscribe((data) => {
      this.followList = data;
      this.isFollowing = this.checkIfFollowing();
    });

    this.followers$=this._followerService.getFollowers(this.loggedInUser)
    this.followers$.subscribe((data)=> {
      this.followers = data;
    })

    this.states=this.locationService.getStates();
    // this.cd.detectChanges();
  /* this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(
      (x) => {
        if (document.getElementById("confirmUpdate")) {
          document.getElementById("confirmUpdate")?.remove();
        }
        if (document.getElementById("refuseUpdate")) {
          document.getElementById("refuseUpdate")?.remove();
        }
      } 
    );*/
  }




  checkIfFollowing():boolean{
      for (let i=0; i<this.followList.length; i++){
        if (this.followList[i].id==this.user.id){
          return true;
        }
      }
      return false;
  }

  allowUpdate() {
    let fs: HTMLElement = document.getElementById("fieldsetEdit")!;
    let submit: HTMLElement = document.getElementById("submitProfile")!;
    if (!fs.hasAttribute("disabled")) {
      fs.setAttribute("disabled", "");
      submit.setAttribute("hidden", "");
    } else {
      fs.removeAttribute("disabled");
      submit.removeAttribute("hidden");
    }
  }

  onSubmit(editProfile: any) {
    if (!document.getElementById("confirmUpdate")) {
      if (this.profanityFilterService.validatePost(editProfile.value.inputAboutMe)){
      let updateForm = editProfile.value;
      console.log(updateForm);
      this.user.firstName = updateForm.inputFirstName;
      this.user.lastName = updateForm.inputLastName;
      this.user.email = updateForm.inputEmail;
      this.user.phoneNumber = updateForm.inputPhoneNumber;
      this.user.address = updateForm.inputAddress;
      this.user.gender = updateForm.selectGender;
      this.user.aboutMe = updateForm.inputAboutMe;
      this.user.city = updateForm.inputCity;
      this.user.state = updateForm.selectState;
      this.user.postalCode = updateForm.inputPostalCode;
      console.log(this.user);
      this._userService
        .updateUser(this.user)
        .subscribe((data) => (this.user = data));
      this.confirmUpdate();
      this.allowUpdate();
      }
      else {
        alert("Your profile contains words banned by this application.");
      }
    } else {
      this.refuseUpdate();
    }
  }

  confirmUpdate(): void {
    let tag: HTMLElement = document.createElement("p");
    let text = document.createTextNode("Successfully updated profile!");
    tag.appendChild(text);
    tag.className = "updateNotif";
    tag.setAttribute("id", "confirmUpdate");
    document.getElementById("accountHeader")?.append(tag);
  }

  refuseUpdate(): void {
    if (!document.getElementById("refuseUpdate")) {
      let tag: HTMLElement = document.createElement("p");
      let text = document.createTextNode(
        "You have already changed your profile"
      );
      tag.appendChild(text);
      tag.className = "updateNotif";
      tag.setAttribute("id", "refuseUpdate");
      document.getElementById("accountHeader")?.append(tag);
    }
  }

  followUser(){
    this._followerService.addFollow(this.loggedInUser,this.user).subscribe();
    let tag: HTMLElement = document.createElement("p");
      let text = document.createTextNode(
        `Now following ${this.user}`
      );
      tag.appendChild(text);
      document.getElementById("followButton")?.append(tag);
      
  }

  unfollow(){
    this._followerService.unfollow(this.loggedInUser.id, this.user.id).subscribe();
    
  }

  viewFollowList(){
    this.viewFollowing=!this.viewFollowing;
  }

  viewFollowerList(){
    this.viewFollowers=!this.viewFollowers;
  }

  unfollowFromList(fid:number){
    this._followerService.unfollow(this.loggedInUser.id, fid).subscribe();
  }

  viewProfilePage(fid:number){
    this.router.navigate(["/profile-page/"+fid]);
  }

  resetPassword(): void {
    this.router.navigate(["/reset-password"]);
  }

  toggleFollow(){
    if(this.isFollowing){
      this.unfollow()
      this.cd.detectChanges()
    }else{
      this.followUser()
      this.cd.detectChanges()
    }
    this.isFollowing = !this.isFollowing
    }
  }
