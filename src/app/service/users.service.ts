import { Injectable } from '@angular/core';
import {UserLdap} from "../Model/user-ldap";
import {LDAP_USERS} from "../Model/ldap-mock-data";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // Liste des utilisateurs
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
