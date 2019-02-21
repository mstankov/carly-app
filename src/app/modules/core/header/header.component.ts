import { Component, OnInit } from '@angular/core';
import AuthService from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) { }

  title = 'Carly';
  user: any;

  ngOnInit() {
    this.authService.user$.subscribe(user => this.user = user);
  }

}
