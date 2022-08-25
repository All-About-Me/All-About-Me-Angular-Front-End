export default class User {
    id: number
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    address: string
    gender: string
    aboutMe: string
    city: string
    state:string
    postalCode:number
    password: string

    constructor (id: number, email: string, firstName: string, lastName: string,
         phoneNumber: string, address: string, gender: string, aboutMe: string,
         city:string, state:string, postalCode:number, password: string) {
        this.id = id
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.phoneNumber = phoneNumber
        this.address = address
        this.gender = gender
        this.aboutMe = aboutMe
        this.city = city
        this.state = state
        this.postalCode = postalCode
        this.password = password
    }
}