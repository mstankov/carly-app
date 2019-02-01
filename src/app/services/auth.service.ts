import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { from, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { storeUserCredentials } from '../helpers/utils';

@Injectable()
export default class AuthService {
    constructor(private router: Router){}

    userInfo: BehaviorSubject<any> = new BehaviorSubject(null);

    getCurrentUserId = () => firebase.auth().currentUser.uid;
    saveNewUser = () => firebase.database().ref('users/').set(this.getCurrentUserId());

    login = (email: string, password: string) => {
        return from(firebase.auth().signInWithEmailAndPassword(email, password))
            .pipe(
                map((result: any) => {
                    storeUserCredentials({ email: email, password: password });

                    this.userInfo.next(result.user);
                    return result;
                }),
                catchError(error => of(error))
            );
    }

    register = (email:string, password: string) => {
        return from(firebase.auth().createUserWithEmailAndPassword(email, password))
            .pipe(
                map((result: any) => {
                    storeUserCredentials({ email: email, password: password });

                    this.userInfo.next(result.user);
                    return result;
                }),
                catchError(error => of(error))
            )
    }

    logout = () => {
        this.userInfo.next(null);
        localStorage.removeItem('user_credentials');

        from(this.router.navigate(['/']))
            .pipe(
                tap(val => val)
            );
    }

    isAuthenticated = () => this.userInfo.getValue() !== null;

    handleUserAuthOnLogin = () => {
        const user : { email: string, password: string } = localStorage.getItem('user_credentials') !== null ? JSON.parse(localStorage.getItem('user_credentials')) : null;

        if (user !== null && user.hasOwnProperty('email') && user.hasOwnProperty('password')) {
            this.login(user.email, user.password)
                .subscribe(res => {
                    this.router.navigate(['home']);
                    console.log('found from local storage', res);
                })
        }
    }
}