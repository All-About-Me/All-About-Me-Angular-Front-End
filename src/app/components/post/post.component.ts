import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Bookmark from 'src/app/models/Bookmark';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  commentForm = new FormGroup({
    text: new FormControl(''),
  })

  @Input('post') post: Post
  replyToPost: boolean = false
  isBookmarked:boolean = false

  constructor(private postService: PostService, private authService: AuthService, private msg:MessengerService, private bookmarkService:BookmarkService) { }

  ngOnInit(): void {
    //getting rid of squiggly lol
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
    this.isBookmarked = !this.isBookmarked
    this.msg.sendMsg(bookmark)
    } else {
    this.bookmarkService.deleteBookmark(bookmark).subscribe()
    this.isBookmarked = !this.isBookmarked
    }
    

  }
}
