import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { addUser, updateUserCars } from './graphql/mutations';
import { getUserCars } from './graphql/queries';
import AuthService from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export default class UserService {
    private uid: string;
    private _userCars: BehaviorSubject<any> = new BehaviorSubject<any>({ loading: true, data: { userCars: [] } });
    public userCars$ = this._userCars.asObservable();

    constructor(private apollo: Apollo, private authService: AuthService) {
        this.uid = this.authService.user.getValue() ? this.authService.user.getValue().uid : null;
        this.getUserCars();
    }

    addUser = (input: any) => {
        const { id, dob, firstName, lastName, email, password, address } = input;
        const { city, street, zipcode } = address;

        return this.apollo.mutate({
            mutation: addUser,
            variables: { 
                id: id,
                firstName: firstName, 
                lastName: lastName,
                dob: dob, 
                email: email,
                password: password,
                city: city,
                street: street,
                zipcode: zipcode ? parseInt(zipcode) : '0000'
             }
        });
    };

    getUserCars = () => this.apollo.watchQuery({
        query: getUserCars,
        variables: {
            id: this.uid
        }
    })
    .valueChanges
    .subscribe(val => this._userCars.next(val));

    addToUserCars = (carId: string) => {
        const userCars: any = this._userCars.getValue().data.userCars;
        let car: any = userCars.find((car: any) => car.id === carId);

        if (!car) {
            this.apollo.mutate({
                mutation: updateUserCars,
                variables: {
                    id: this.uid,
                    carIds: [...userCars.map((x: any) => x.id), carId]
                }
            }).subscribe(cars => {
                const updatedCars = cars.data.updateUserCars;
                this._userCars.next({ loading: false, data: { userCars: updatedCars }});
            }, error => console.log(error));

        };
    };
}