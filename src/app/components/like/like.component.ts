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
  likeList:Like[];
  partialLikeList:string;

  constructor(private likeService:LikeService, private authService: AuthService) { }

  ngOnInit(): void {
    if(this.likeService.likesForUser){
    for(let like of this.likeService.likesForUser){
      if(like.post.id==this.post.id){
        this.currentUserLikes=true;
      }
    }
  
    this.likeService.getAllLikesForPost(this.post).subscribe((data) =>{ this.likeCount=data.length
    this.likeList=data;
    this.whoLikes();
    })
  }
  }
  whoLikes() {
    let users:string[]=[];
    if(this.likeList.length>0){
      for(let like of this.likeList){
      if(users.length>=3){
        break;
      }else{
        let name:string= like.user.firstName+" "+like.user.lastName
        users.push(name)
      }
      }
      this.partialLikeList=users.toString() 
      if(this.likeList.length-users.length>0){
        this.partialLikeList=this.partialLikeList + " and "+(this.likeList.length-users.length)+" others Like this."
      }else if(users.length==1){
        this.partialLikeList=this.partialLikeList + " Likes this."
      }else{
        this.partialLikeList=this.partialLikeList + " Like this."
      }
    }else{
      this.partialLikeList='Nobody has liked this yet'
    }
  }

  ngOnChanges():void {
    if(this.likeService.likesForUser){
    for(let like of this.likeService.likesForUser){
      if(like.post.id==this.post.id){
        this.currentUserLikes=true;
      }
    }
    this.likeService.getAllLikesForPost(this.post).subscribe((data) =>{ this.likeCount=data.length
      this.likeList=data;
      this.whoLikes();
      })
  }
  }

  likePost(){
    this.likeService.likePost(this.authService.currentUser,this.post).subscribe()
    this.currentUserLikes=true
    this.likeService.getAllMyLikes(this.authService.currentUser)
    let like:Like=new Like(0,this.authService.currentUser,this.post)
    this.likeList.push(like)
    this.likeCount++
    this.whoLikes();
  }
  unlikePost(){
    let like:Like=new Like(0,this.authService.currentUser,this.post)
    this.likeService.unLike(like).subscribe()
    this.currentUserLikes =false;
    this.likeService.getAllMyLikes(this.authService.currentUser)
    this.likeList.splice(this.likeList.indexOf(like),1)
    this.likeCount--
    this.whoLikes();
  }
}
