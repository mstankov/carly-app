import { Component, OnInit } from '@angular/core';
import UserService from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userCars: any;
  loading: boolean = true;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.userCars$.subscribe(data => {
      this.userCars = data.data.userCars;
      this.loading = data.loading;
    });
  };

}
