import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedGuard implements CanActivate {
  constructor(private router:Router) {}
  canActivate(): boolean {
    if (localStorage.getItem("user-token")) {
      this.router.navigate(["/notes/all"]);
      return false;
    }
    else{
      return true;
    }
  }
}
