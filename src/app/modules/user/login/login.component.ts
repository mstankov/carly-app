import { Component, OnInit } from '@angular/core';
import AuthService from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register/dialog/register-dialog/register-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }), animate(900)
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.authService.handleUserAuthOnLogin();
  };

  email: string;
  password: string;

  openRegistrationDialog() {
    this.dialog.open(RegisterDialogComponent, {
     width: '40%'
   });
  };

  doLogin = () => {
    this.authService.login(this.email, this.password)
      .subscribe(
        () => this.router.navigate(['home']),
        error => console.log(error)
      )
  };
};

