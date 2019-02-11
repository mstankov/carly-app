import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Car from 'src/app/shared/models/car.model';
import { CarDialogComponent } from './car-dialog/car-dialog.component';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  @Input() car: Car;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
     this.dialog.open(CarDialogComponent, {
      width: '40%',
      data: { car: this.car }
    });
  };
};

