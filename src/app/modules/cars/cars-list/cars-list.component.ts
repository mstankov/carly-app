import { Component, OnInit } from '@angular/core';
import CarService from 'src/app/services/car.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {
  cars: any;
  loading: Boolean = true;

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.cars = this.carService.getAllCars()
      .subscribe((data: any) => {
        this.cars = data.data.cars,
        this.loading = data.loading;
      });
  }

  wasSelected = (event: any) => console.log(event);
}
