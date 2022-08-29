import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { ProfanityFilterService } from '../../services/profanity-filter.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  commentForm = new FormGroup({
    text: new FormControl(''),
  })

  @Input('comment') inputComment: Post;
  replyToComment: boolean = false

  constructor(private postService: PostService, 
    private authService: AuthService,
    private profanityFilterService: ProfanityFilterService) { }

  ngOnInit(): void {
  }

  toggleReplyToComment = () => {
    this.replyToComment = !this.replyToComment
  }

  submitReply = (e: any) => {
    e.preventDefault()
    let date:Date = new Date()
    if (this.profanityFilterService.validatePost(this.commentForm.value.text!)){
    let newComment = new Post(0, this.commentForm.value.text || "", "", date, this.authService.currentUser, [])
    this.postService.upsertPost({...this.inputComment, comments: [...this.inputComment.comments, newComment]})
      .subscribe(
        (response) => {
          this.inputComment = response
          this.toggleReplyToComment()
        }
      )
    }
    else {
      alert('Your post contains words banned from this application.');
    }
  }
}
