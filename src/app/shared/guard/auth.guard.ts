import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isAuthenticated().then((loggedIn: boolean) => {
      if (loggedIn) {
        switch (state.url) {
          case '/home/user':
            // if (!this.authService.isSysManager()) {
            //   this.router.navigate(['/home/amakari-list']);
            //   return false;
            // }
            break;
          case '/home':
            this.router.navigate(['/home/user']);
            return false;
          case '/home/amakari-list':
            return true;
        }

        return true;
      }

      this.router.navigate(['/login']);
      return false;
    });
  }
}
