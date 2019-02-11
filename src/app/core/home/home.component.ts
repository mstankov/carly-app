import { Component, OnInit } from '@angular/core';
import UserService from 'src/app/services/user.service';
import AuthService from 'src/app/services/auth.service';
import { Car } from 'src/app/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userCars: any;
  loading: boolean = true;
  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    const uid: string = this.authService.user.getValue().uid;

    this.userCars = this.userService
      .getUserCars(uid)
      .subscribe((res: any) => {
        this.loading = res.loading;
        this.userCars = res.data.cars;
      });
  };

}
