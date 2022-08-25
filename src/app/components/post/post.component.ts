import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Bookmark from 'src/app/models/Bookmark';
import { Like } from 'src/app/models/like.model';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { LikeService } from 'src/app/services/like.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnChanges {

  commentForm = new FormGroup({
    text: new FormControl(''),
  })

  @Input('post') post: Post
  @Input('bookmarkList') bookmarkList:Post []=[]
  @Output() bookmarkListChange = new EventEmitter<Post[]>()
  replyToPost: boolean = false
  isBookmarked:boolean = false
  isLiked: boolean = true
  isUnliked: boolean = true
  totalLikes = Like.length + 1

  constructor(private postService: PostService, 
    private authService: AuthService, 
    private bookmarkService:BookmarkService,
    private router:Router,
    private likeService: LikeService) { }

  ngOnInit(): void {
    for(let listPost of this.bookmarkList){
    if(listPost.id==this.post.id){
      this.isBookmarked=true
    }
  }
  }
  ngOnChanges(changes: SimpleChanges): void {
      if(this.bookmarkList.includes(this.post)){
        this.isBookmarked=true
      }      
    
  }

  toggleReplyToPost = () => {
    this.replyToPost = !this.replyToPost
  }

  submitReply = (e: any) => {
    e.preventDefault()
    let newComment = new Post(0, this.commentForm.value.text || "", "", this.authService.currentUser, [])
    this.postService.upsertPost({...this.post, comments: [...this.post.comments, newComment]})
      .subscribe(
        (response) => {
          this.post = response
          this.toggleReplyToPost()
        }
      )
  }

  toggleBookmark = () => {
    let bookmark = new Bookmark(0,this.authService.currentUser,this.post);
    if(!this.isBookmarked){
    this.bookmarkService.bookmarkPost(this.authService.currentUser,this.post).subscribe()
    this.bookmarkList.push(this.post)
    this.isBookmarked = !this.isBookmarked
    this.bookmarkListChange.emit(this.bookmarkList)
    } else {
    this.bookmarkService.deleteBookmark(bookmark).subscribe()
    this.bookmarkList.splice(this.bookmarkList.indexOf(this.post), 1)
    this.isBookmarked = !this.isBookmarked
    this.bookmarkListChange.emit(this.bookmarkList)
    }
  }

  viewProfile(){
    this.router.navigate(["/profile-page/"+this.post.author.id])
  }

  toggleLike():any {
    if(this.isLiked)
    {
      this.totalLikes + 1
    }
  }
}
