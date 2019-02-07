import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getAllCars, getCar } from './graphql/queries';

@Injectable({
    providedIn: 'root'
})
export default class CarService {
    constructor(private apollo: Apollo) {}

    getAllCars = () => this.apollo
            .watchQuery({
                query: getAllCars
            })
            .valueChanges

    getCar = (id: string) => this.apollo
            .watchQuery({
                query: getCar(id)
            })
            .valueChanges
    
}