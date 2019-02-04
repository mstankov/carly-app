import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Car from 'src/app/shared/models/car.model';
import DataService from 'src/app/services/data.service';
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
    public dataService: DataService,
    public authService: AuthService
  ) {}

  getData = async () => await this.dataService.getUserData(this.authService.getCurrentUserId());
  saveData = async () => await this.dataService.saveUserData(this.authService.getCurrentUserId());

  onNoClick(): void {
    this.dialogRef.close();
    this.data.car = null;
  }
}