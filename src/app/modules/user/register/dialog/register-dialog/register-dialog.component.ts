import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import AuthService from 'src/app/services/auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import UserService from 'src/app/services/user.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import SnackBarService from 'src/app/services/snackbar.service';

const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class RegisterDialogComponent implements OnInit {
  credentialsFormGroup: FormGroup;
  nameFormGroup: FormGroup;
  addressFormGroup: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.credentialsFormGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      dob: [_moment(''), Validators.required]
    });
  
    this.nameFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  
    this.addressFormGroup = this.fb.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      zipcode: ['']
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  };

  register = ({ credentialsForm, nameForm, addressForm }) => {
    const { email, password, dob } = credentialsForm.value;
    const { firstName, lastName } = nameForm.value;
    const { city, street, zipcode } = addressForm.value;
  
    this.authService.register(email, password)
      .pipe(
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      )
      .subscribe(
        val => {
          if (!val.user) {
            this.closeDialog();
            this.snackBarService.openSnackBar(val.message);
            return;
          }
    
          const uid = val.user.uid;
          if (val.additionalUserInfo.isNewUser) {
            this.userService.addUser({
              id: uid,
              email: email,
              password: password,
              firstName: firstName,
              lastName: lastName,
              dob: dob.format('MM-DD-YYYY'),
              address: {
                city: city,
                street: street,
                zipcode: zipcode
              }
            })
            .subscribe(
              user => console.log(user),
              error => console.log(error),
              () => {
                this.router.navigate(['home']);
                this.closeDialog();
                this.snackBarService.openSnackBar(`Welcome, ${firstName} ${lastName}`);
              }
            );
          }
        },

        error => console.log(error)
      );
  };
}
