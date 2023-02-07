import { Injectable } from '@angular/core';
import {UserLdap} from "../ldap-management/ldap-list/user-ldap";
import {LDAP_USERS} from "../ldap-management/ldap-list/ldap-mock-data";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: UserLdap[] = LDAP_USERS;
  private static users:UserLdap[];

  getUsers():Observable<UserLdap[]>{
    return of(this.users)
  }

  getUser(login:string):Observable<UserLdap>{
    return of(this.users.find(user=> user.login === login));
  }
  addUser(user:UserLdap):Observable<UserLdap>{
    UsersService.users.push(user);
    return of (user);
  }

  updateUser(userToUpdate:UserLdap): Observable<UserLdap>{
    const user = UsersService.users.find(u => u.login === userToUpdate.login);
    if(user){
      user.nom = userToUpdate.nom;
      user.prenom = userToUpdate.prenom;
      user.nomComplet = user.nom + ' ' + user.prenom;
      user.motDePasse = userToUpdate.motDePasse;

      return of(userToUpdate);
    }
    return throwError('Utilisateur non trouvé');
  }
  constructor() { }
}
