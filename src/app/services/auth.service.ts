import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  authUrl: string = `${environment.baseUrl}/auth`;
  currentUser: User

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const payload = {email:email, password:password};
    const res = this.http.post<any>(`${this.authUrl}/login`, payload, {headers: environment.headers, withCredentials: environment.withCredentials});
    res.subscribe((data) => {
      this.currentUser = data
    })
    return res;
  }

  logout(): void{
    this.http.post(`${this.authUrl}/logout`, null).subscribe();
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const payload = {firstName: firstName, lastName: lastName, email: email, password: password};
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }


  search(first_Name:string): Observable<User> {
      console.log(first_Name);
          
            
         //let x= first_Name.controls['search_field'].value 
      //   console.log(x)
       // this.first_Name.get('select_field').value
       return this.http.get<User>("http://localhost:8080/auth/users/"+first_Name)
    } 

    
  resetPassword(user: User): Observable<User>{
    return this.http.put<User>(this.authUrl+"/resetPwd", user, {headers: environment.headers, withCredentials: environment.withCredentials})
  }

  }

