import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { addUser } from './graphql/mutations';
import { getUserCars } from './graphql/queries';

@Injectable({
    providedIn: 'root'
})
export default class UserService {
    constructor(private apollo: Apollo) {}

    addUser = (input: any) => {
        const { id, firstName, lastName, email, password, address } = input;

        return this.apollo.mutate({
            mutation: addUser,
            variables: { 
                id: id,
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

    getUserCars = (id: string) => this.apollo.watchQuery({
        query: getUserCars,
        variables: {
            id: id
        }
    }).valueChanges
}