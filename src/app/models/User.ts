export default class User {
    id: number
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    address: string
    gender: string
    aboutMe: string
    password: string

    constructor (id: number, email: string, firstName: string, lastName: string,
         phoneNumber: string, address: string, gender: string, aboutMe: string, password: string) {
        this.id = id
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.phoneNumber = phoneNumber
        this.address = address
        this.gender = gender
        this.aboutMe = aboutMe
        this.password = password
    }
}