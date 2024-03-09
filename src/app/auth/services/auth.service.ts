import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = environments.baseURL
  private user?: User;

  constructor( private http: HttpClient) { }

  get currentUser():User|undefined{
    if ( !this.user ) return undefined;
    return structuredClone(this.user);//hace un deep clone del user
  }

  login(email:string , password:string): Observable<User>{
    // http.post(log9in, email y pasword)
    return this.http.get<User>(`${ this.baseURL}/users/1`)
      .pipe(
        tap( user => this.user = user),
        tap( user => localStorage.setItem('token', 'AaGfSGHhsGfsaG6.kjGHKjgKJ798.0988LKH'))
      )
  }

  checkAuthentication():Observable<boolean>{
    if( !localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${ this.baseURL }/users/1`)
      .pipe(
        tap( user => this.user = user),
        map( user => !!user),
        catchError ( err => of(false))
      );
  }

  logout(){
    this.user = undefined;
    localStorage.clear()
  }

}
