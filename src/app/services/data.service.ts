import { Injectable } from '@angular/core';
import Car from '../shared/models/car.model';
import { Observable, BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export default class DataService {
    private _database: firebase.database.Database;
    private _cars: Car[];
    private _carsSubject: BehaviorSubject<Car[]>;
    public readonly cars: Observable<Car[]>;

    constructor() {
        this._database = firebase.database();
        this._carsSubject = new BehaviorSubject(this._cars);
        this.cars = this._carsSubject.asObservable();
    }

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