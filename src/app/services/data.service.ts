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
        this._cars = [
            new Car(300, 'Ferrari', 3, 'Enzo', 2006, 2007, 'https://cdn2.evo.co.uk/sites/evo/files/styles/gallery_adv/public/2017/03/16.jpg'),
            new Car(300, 'Bugatti', 3, 'Veyron', 2006, 2007, 'https://assets.bugatti.com/fileadmin/_processed_/sei/p63/se-image-ce40627babaa7b180bc3dedd4354d61c.jpg'),
            new Car(300, 'Moskvich', 5, '412', 2006, 2007, 'http://bri4ka.bg/listings/media/listing//1523104909_30412523_1608051835972602_7481484913942724608_n.jpg'),
            new Car(300, 'VW', 5, 'Passat', 2006, 2007, 'https://cdn.volkswagen.bg/media/Theme_Content_Image_Component/4761-10949-image/dh-1085-852e97/c9dd14d3/1464698989/par3796-preview.jpg')
        ];
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