import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getAllCars, getCar } from './graphql/queries';
import AuthService from './auth.service';

@Injectable({
    providedIn: 'root'
})
export default class CarService {
    uid: string;

    constructor(private apollo: Apollo, private authService: AuthService) {
        this.getAllCars();
        this.uid = this.authService.user.getValue().uid;
    }

    getAllCars = () => this.apollo
        .watchQuery({
            query: getAllCars
        })
        .valueChanges;

    getCar = (id: string) => this.apollo
        .watchQuery({
            query: getCar(),
            variables: {
                id: id
            }
        })
        .valueChanges;
}