import Post from "./Post";
import User from "./User";

export class Like {

    id: number;
    post: Post;
    user: User;
    

    constructor( user:User, post:Post){

        this.post = post;
        this.user = user;
    }
}
