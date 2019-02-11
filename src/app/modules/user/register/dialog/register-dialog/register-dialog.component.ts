import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import AuthService from 'src/app/services/auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import UserService from 'src/app/services/user.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
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
    private userService: UserService
  ) {}

  ngOnInit() {
    this.credentialsFormGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
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

  onNoClick(): void {
    this.dialogRef.close();
  };

  register = ({ credentialsForm, nameForm, addressForm }) => {
    const { email, password } = credentialsForm.value;
    const { firstName, lastName } = nameForm.value;
    const { city, street, zipcode } = addressForm.value;
  
    this.authService.saveNewUser();
    this.authService.register(email, password)
      .subscribe(
        val => {
          const uid = val.user.uid;

          if(val.additionalUserInfo.isNewUser) {
            this.userService.addUser({
              id: uid,
              email: email,
              password: password,
              firstName: firstName,
              lastName: lastName,
              address: {
                city: city,
                street: street,
                zipcode: zipcode
              }
            }).subscribe(user => console.log(user));
          }
          this.router.navigate(['home']);
        },

        error => console.log(error)
      );
  };
}
