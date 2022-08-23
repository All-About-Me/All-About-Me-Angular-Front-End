import Post from "./Post"
import User from "./User"

export default class Like {
    id: number
    user:User
    post:Post

    constructor(id:number, user:User, post:Post){
        this.id=id
        this.user=user
        this.post=post
    }
}