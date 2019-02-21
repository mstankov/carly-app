import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import AuthService from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export default class AuthGuard implements CanActivate {
    private user: any;
    constructor(protected router: Router, protected authService: AuthService)
    {
        this.authService.user$.subscribe(user => this.user = user);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (state.url !== '/login' && !this.user) {
            this.authService.logout();
            return false;
        }

        return true;
    }
}