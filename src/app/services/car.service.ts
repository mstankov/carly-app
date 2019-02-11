import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getAllCars, getCar } from './graphql/queries';

@Injectable({
    providedIn: 'root'
})
export default class CarService {
    constructor(private apollo: Apollo) {
        this.getAllCars();
    }

    getAllCars = () => this.apollo
            .watchQuery({
                query: getAllCars
            })
            .valueChanges

    getCar = (id: string) => this.apollo
            .watchQuery({
                query: getCar(),
                variables: {
                    id: id
                }
            })
            .valueChanges
}