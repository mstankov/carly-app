import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsListComponent } from './cars-list/cars-list.component';
import { CarsComponent } from './cars.component';
import { CarComponent } from './car/car.component';
import { MatCardModule } from '@angular/material/card';
import { CarDialogComponent } from './car/car-dialog/car-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CarsRoutingModule,
    MatCardModule,
    MatDialogModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  declarations: [
    CarsListComponent, 
    CarsComponent, 
    CarComponent,
    CarDialogComponent
  ],
  entryComponents: [
    CarDialogComponent
  ]
})
export class CarsModule { }
