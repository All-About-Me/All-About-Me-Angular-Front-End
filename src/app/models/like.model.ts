import Post from "./Post";
import User from "./User";

export class Like {

    id: number;
    post: Post;
    user: User;
    

    constructor(id:number, user:User, post:Post){
        this.id = id;
        this.post = post;
        this.user = user;
    }
}
