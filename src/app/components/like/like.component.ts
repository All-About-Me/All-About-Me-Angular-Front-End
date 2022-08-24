import { Component, Input, OnChanges, OnInit } from '@angular/core';
import Like from '../../models/Like';
import Post from '../../models/Post';
import { AuthService } from '../../services/auth.service';
import { LikeService } from '../../services/like.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit, OnChanges {

  @Input('post') post: Post;
  currentUserLikes:boolean = false;
  likeCount:number;

  constructor(private likeService:LikeService, private authService: AuthService) { }

  ngOnInit(): void {
    if(this.likeService.likesForUser){
    for(let like of this.likeService.likesForUser){
      if(like.post.id==this.post.id){
        this.currentUserLikes=true;
      }
    }
  
    this.likeService.getAllLikesForPost(this.post).subscribe((data) => this.likeCount=data.length)
  }
  }

  ngOnChanges():void {
    if(this.likeService.likesForUser){
    for(let like of this.likeService.likesForUser){
      if(like.post.id==this.post.id){
        this.currentUserLikes=true;
      }
    }
    this.likeService.getAllLikesForPost(this.post).subscribe((data) => this.likeCount=data.length)
  }
  }

  likePost(){
    this.likeService.likePost(this.authService.currentUser,this.post).subscribe()
    this.currentUserLikes=true
    this.likeService.getAllMyLikes(this.authService.currentUser)
    this.likeCount++
  
  }
  unlikePost(){
    let like:Like=new Like(0,this.authService.currentUser,this.post)
    this.likeService.unLike(like).subscribe()
    this.currentUserLikes =false;
    this.likeService.getAllMyLikes(this.authService.currentUser)
    this.likeCount--
  }
}
