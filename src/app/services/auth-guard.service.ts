import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import AuthService from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export default class AuthGuard implements CanActivate {

    constructor(protected router: Router, protected authService: AuthService)
    {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (state.url !== '/login' && !this.authService.user.getValue()) {
            this.authService.logout();
            return false;
        }

        return true;
    }
}