import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Bookmark from 'src/app/models/Bookmark';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { LikeService } from 'src/app/services/like.service';
import { PostService } from 'src/app/services/post.service';
import { FollowerService } from '../../services/follower.service';
import { ProfanityFilterService } from '../../services/profanity-filter.service';


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
  allBookmarks:Bookmark[]=[];
  showFollows:boolean = true;
  followList:User[] = [];
  loggedInUser:User;
  followedPosts: Post[] = [];

  submitForm: FormGroup;
  constructor(
    private postService: PostService,
    private authService: AuthService,
    private bookmarkService: BookmarkService,
    private fb: FormBuilder,
    private router: Router, 
    private likeService:LikeService,
    private profanityFilterService:ProfanityFilterService
  ) {}
  users: User | any;
  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((response) => {
      this.posts = response;
    });
    if(this.authService.currentUser){
      this.likeService.getAllMyLikes(this.authService.currentUser)
      }

    this.loggedInUser = this.authService.currentUser;
    this.getBookmarks();
    this.getFollowedPosts();
    
      this.submitForm = this.fb.group({
      search_field: [''],
  })
  }

  toggleCreatePost = () => {
    this.createPost = !this.createPost
  }

  toggleFeed =()=>{
    this.showBookmarks=!this.showBookmarks;
    
  }

  getValue(val:string){
    console.log(val)
  }
  
  getBookmarks(){
    this.bookmarkService.getAllSavedPosts(this.loggedInUser).subscribe(
    (response) => {
      this.bookmarkedPosts.length=0
      this.allBookmarks = response
      for (const element of this.allBookmarks){
        this.bookmarkedPosts.push(element.post);
      }
    }
  )}
  

  getFollowedPosts(){
    this.postService.getFollowedPosts(this.loggedInUser).subscribe(
      data =>{this.followedPosts=data}
    )
  }

  toggleFollowedPosts =()=>{
    this.showFollows=!this.showFollows; 
  }

  submitPost = (e: any) => {
    e.preventDefault();
    let date:Date = new Date();
    if (this.profanityFilterService.validatePost(this.postForm.value.text!)){
    this.postService
      .upsertPost(
        new Post(
          0,
          this.postForm.value.text || "",
          this.postForm.value.imageUrl || "",
          date,
          this.authService.currentUser,
          []
        )
      )
      .subscribe((response) => {
        this.posts = [response, ...this.posts];
        this.toggleCreatePost();
      });
    }
    else{
      alert('Your post contains words banned from this application.');
    }
    this.postForm.setValue({'text':'','imageUrl':''})
  };


  viewAll = () => {
    this.authService.viewAllUsers().subscribe((data) => {
      this.users = data;
    });
  };

  linkAll = (input: any) => {
    console.log(input);
    this.router.navigate(["/profile-page/" + (input)]);
  };

}
