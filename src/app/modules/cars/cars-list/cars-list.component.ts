import { Component, OnInit } from '@angular/core';
import CarService from 'src/app/services/car.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {
  cars: any[];
  loading: boolean = true;
  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carService.getAllCars()
      .subscribe((data: { loading: boolean, data: any }) => {
        this.cars = data.data.cars;
        this.loading = data.loading;
      });
  }
}
