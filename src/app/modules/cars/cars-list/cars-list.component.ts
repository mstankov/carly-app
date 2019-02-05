import { Component, OnInit } from '@angular/core';
import Car from '../../../shared/interfaces/car.interface';
import DataService from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {
  cars: Observable<Car[]>;
  loading: Boolean = true;

  constructor(private dataService: DataService, private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
    .watchQuery({
      query: query
    })
    .valueChanges
    .subscribe((res: any) => {
      this.cars = res.data.cars;
      this.loading = res.data.loading;
    })
  }

  wasSelected = (event: any) => console.log(event);

}

const query = gql`
  query {
    cars {
      manufacturer
      model
      topSpeed
      horsePower
      torque
      dateAdded
      doors
      yearFrom
      yearTo
      information
      imageUrl
    }
  }
`;