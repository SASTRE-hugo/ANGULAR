import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthentificationService} from "./authentification.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authentificationService : AuthentificationService,
    private router: Router) {}
  canActivate(
    next:ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(state.url);
  }
  private checkLogin(url: string): boolean{
    if (AuthentificationService.isLoggedIn()){
      return true;
    }
    this.authentificationService.redirectUrl=url;

    this.router.navigate(['/login']);
    return false;
  }
}
