import User from "./User"

export default class Post {
    id: number
    text: string
    imageUrl: string
    date:Date
    author: User
    comments: Post[]

    constructor (id: number, text: string, imageUrl: string, date:Date, author: User, comments: Post[]) {
        this.id = id
        this.text = text
        this.imageUrl = imageUrl
        this.date = date
        this.author = author
        this.comments = comments
    }
}