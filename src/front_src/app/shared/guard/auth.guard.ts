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
          // ログイン済みなのに、ログイン画面に遷移しようとした時は
          // 別ページに飛ばす
          case '/login':
            this.router.navigate(['/home']);
            return false;
        }
      }

      return true;
    });
  }
}
