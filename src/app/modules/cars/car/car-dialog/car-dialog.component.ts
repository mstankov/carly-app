import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Car from 'src/app/shared/models/car.model';
import AuthService from 'src/app/services/auth.service';

@Component({
  selector: 'app-car-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.css']
})
export class CarDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { car: Car },
    public authService: AuthService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
    this.data.car = null;
  }
}