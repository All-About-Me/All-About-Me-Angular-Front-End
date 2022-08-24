import { HttpErrorResponse } from "@angular/common/http";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import Bookmark from "src/app/models/Bookmark";
import Post from "src/app/models/Post";
import User from "src/app/models/User";
import { AuthService } from "src/app/services/auth.service";
import { BookmarkService } from "src/app/services/bookmark.service";
import { PostService } from "src/app/services/post.service";

@Component({
  selector: "app-post-feed-page",
  templateUrl: "./post-feed-page.component.html",
  styleUrls: ["./post-feed-page.component.css"],
})
export class PostFeedPageComponent implements OnInit {
  postForm = new FormGroup({
    text: new FormControl(""),
    imageUrl: new FormControl(""),
    //we should be able to create a custome validator here when we get to the optional functon "profanity filter"
  });

  posts: Post[] = [];
  createPost: boolean = false;
  showBookmarks: boolean = false;
  bookmarkedPosts: Post[] = [];
  allBookmarks: Bookmark[] = [];

  submitForm: FormGroup;
  constructor(
    private postService: PostService,
    private authService: AuthService,
    private bookmarkService: BookmarkService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  users: User | any;
  ngOnInit(): void {
    this.getBookmarks();

    this.postService.getAllPosts().subscribe((response) => {
      this.posts = response;
    });

    this.submitForm = this.fb.group({
      search_field: [""],
    });
  }

  toggleCreatePost = () => {
    this.createPost = !this.createPost;
  };

  submitPost = (e: any) => {
    e.preventDefault();
    this.postService
      .upsertPost(
        new Post(
          0,
          this.postForm.value.text || "",
          this.postForm.value.imageUrl || "",
          this.authService.currentUser,
          []
        )
      )
      .subscribe((response) => {
        this.posts = [response, ...this.posts];
        this.toggleCreatePost();
      });
  };

  toggleFeed = () => {
    this.showBookmarks = !this.showBookmarks;
  };

<<<<<<< Updated upstream
  getValue(val:string){
    console.log(val)
  }
  

  viewAll= () => {
    this.authService.viewAllUsers().subscribe(data=>{
      this.users =data;
      alert("Ensure Correct Spelling!");
=======
  getValue(val: string) {
    console.log(val);
  }

  onSearch = (someInput: string) => {
    //   try{
    //     this.authService.search(someInput).subscribe((res:any)=>{
    //       if (res == null) { //checks input, should return user if they exist, else its null
    //         alert("No user with that first name exists!")
    //         throw 'Wrong User Information'; //creates custom error
    //       }this.router.navigate(['/profile-page/'+res.id])
    //     },//similar to working with a promoise
    //     (error: HttpErrorResponse) => { //used to catch error
    //       console.log(error);
    //     });
    // } catch(e) {  //used to catch error
    // }
  };

  viewAll = () => {
    //concerned onSearch might be too specific
    this.authService.viewAllUsers().subscribe((data) => {
      //this provides data on all users in database
      this.users = data; //worried this might display too much un-needed information
>>>>>>> Stashed changes
    });
  };

  getBookmarks() {
    this.bookmarkService
      .getAllSavedPosts(this.authService.currentUser)
      .subscribe((response) => {
        this.bookmarkedPosts.length = 0;
        this.allBookmarks = response;
        for (const element of this.allBookmarks) {
          this.bookmarkedPosts.push(element.post);
        }
      });
  }
<<<<<<< Updated upstream
  linkAll= (input:any) => {
    this.router.navigate(['/profile-page/'+(input+1)]);
};

  getBookmarks(){
    this.bookmarkService.getAllSavedPosts(this.authService.currentUser).subscribe(
    (response) => {
      this.bookmarkedPosts.length=0
      this.allBookmarks = response
      for (const element of this.allBookmarks){
        this.bookmarkedPosts.push(element.post);
      }
    }
  )}
=======
>>>>>>> Stashed changes
}
