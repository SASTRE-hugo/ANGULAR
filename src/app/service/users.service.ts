import { Injectable } from '@angular/core';
import {UserLdap} from "../Model/user-ldap";
import {LDAP_USERS} from "../Model/ldap-mock-data";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // Liste des utilisateurs
  users: UserLdap[] = LDAP_USERS;

  getUsers():Observable<UserLdap[]>{
    return of(this.users)
  }

  getUser(login:string):Observable<UserLdap>{
    return of(this.users.find(user=> user.login === login));
  }
  constructor() { }
}
