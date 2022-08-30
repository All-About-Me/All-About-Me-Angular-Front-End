import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Bookmark from 'src/app/models/Bookmark';
import Like from 'src/app/models/Like';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { LikeService } from 'src/app/services/like.service';
import { PostService } from 'src/app/services/post.service';
import { ProfanityFilterService } from '../../services/profanity-filter.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit, OnChanges {

  commentForm = new FormGroup({
    text: new FormControl(''),
  })

  //post represents this particular post as retrieved from the database by the post-feed-page
  //bookmarkList lists all of the posts that the current user has bookmarked and is used to set the value of isBookmarked at initialization
  //replyToPost toggles the display of the text entry form to make comments 
  @Input('post') post: Post
  @Input('bookmarkList') bookmarkList: Post[] = []
  @Output() bookmarkListChange = new EventEmitter<Post[]>()
  replyToPost: boolean = false
  isBookmarked: boolean = false

  url: string;
  str: boolean;
  urlSafe: SafeResourceUrl;


  constructor(private postService: PostService,
    private authService: AuthService,
    private bookmarkService: BookmarkService,
    private router: Router,
    private profanityFilterService: ProfanityFilterService,
    public sanitizer: DomSanitizer
    ) { }

  //when initialized, this post will check the list of bookmarks which it recieves from the post-feed-page.
  //  if it finds a post id which matches its own, then it will set itself as bookmarked (this in turn changes the icon that is displayed)
  ngOnInit(): void {
    for (let listPost of this.bookmarkList) {
      if (listPost.id == this.post.id) {
        this.isBookmarked = true
      }
    }
  }
  check(imageUrl:any) : any {
    if(imageUrl.includes("youtube")){
      this.url = "https://www.youtube.com/embed/" + imageUrl.substring(32,43);
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      //this.str = this.videoLink === "https://www.youtube.com/embed/nrZxwPwmgrw"
      // + imageUrl.substring(32,43)
      return true;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    for (let listPost of this.bookmarkList) {
      if (listPost.id == this.post.id) {
        this.isBookmarked = true
      }
    }

  }

  //toggles whether the comment creation form is displayed or not
  toggleReplyToPost = () => {
    this.replyToPost = !this.replyToPost
  }

  //creates a new comment for this post and sends it to the database as a post
  submitReply = (e: any) => {
    e.preventDefault()
    let date: Date = new Date()
    if (this.profanityFilterService.validatePost(this.commentForm.value.text!)) {
      let newComment = new Post(0, this.commentForm.value.text || "", "", date, this.authService.currentUser, [])
      this.postService.upsertPost({ ...this.post, comments: [...this.post.comments, newComment] })
        .subscribe(
          (response) => {
            this.post = response
            this.toggleReplyToPost()
          }
        )
    }
    else {
      alert('Your post contains words banned from this application.');
    }
  }

  //toggles the bookmark status of a post. if it is currently bookmarked: will send the new bookmak to the server, 
  //add the bookmark to the bookmark list, flip the boolean marking it as not bookmarked, and emit the new bookmarkList
  //if it is not currently bookmarked: it will send a delete command to the server for this bookmark, remove the bookmark from the bookmarkList, 
  //flip the boolean marking it as bookmarked, and emit the new bookmarkList
  toggleBookmark = () => {
    let bookmark = new Bookmark(0, this.authService.currentUser, this.post);
    if (!this.isBookmarked) {
      this.bookmarkService.bookmarkPost(this.authService.currentUser, this.post).subscribe()
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

  //sends the current user to view the profile page for the author of the post
  viewProfile() {
    this.router.navigate(["/profile-page/" + this.post.author.id])
  }

}
