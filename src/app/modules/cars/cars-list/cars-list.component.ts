import { Component, OnInit } from '@angular/core';
import Car from '../../../shared/interfaces/car.interface';
import DataService from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { debug } from 'util';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {
  cars: Observable<Car[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.cars = this.dataService.cars;
  }

  wasSelected = (event: any) => console.log(event);

}
