import { Injectable } from '@angular/core';
import Car from '../shared/models/car.model';
import { Observable, BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import { Apollo } from 'apollo-angular';
import { addUser } from './graphql/mutations';

@Injectable({
    providedIn: 'root'
})
export default class UserService {
    private _database: firebase.database.Database;
    private _cars: Car[];
    private _carsSubject: BehaviorSubject<Car[]>;
    public readonly cars: Observable<Car[]>;

    constructor(private apollo: Apollo) {
        this._database = firebase.database();
        this._carsSubject = new BehaviorSubject(this._cars);
        this.cars = this._carsSubject.asObservable();
    }

    addUser = (input: any) => {
        const { firstName, lastName, email, password, address } = input;

        return this.apollo.mutate({
            mutation: addUser,
            variables: { 
                firstName: firstName, 
                lastName: lastName, 
                email: email,
                password: password,
                city: address.city,
                street: address.street,
                zipcode: parseInt(address.zipcode)
             }
        });
    };

    getUserData = async (userId: string) => {
        const data = await this._database.ref('users/' + userId);
        return data;
    }

    saveUserData = (userId: string) => {
        this._database.ref('users/' + userId)
            .set({
                cars: this._cars
            });
    }
}