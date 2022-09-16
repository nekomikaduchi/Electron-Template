import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ROLE_TYPE } from '../common/enum';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerGuard implements CanActivate {
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
        const role = this.authService.getCurrentUser().role;

        if (role != ROLE_TYPE.SYS_MNG) {
          return true;
        }
      }

      this.router.navigate(['/home']);
      return false;
    });
  }
}
