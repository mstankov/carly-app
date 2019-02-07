import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import AuthService from 'src/app/services/auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  isLinear = false;
  credentialsFormGroup: FormGroup;
  nameFormGroup: FormGroup;
  addressFormGroup: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
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
  }

  register = (data: any) => {
    this.authService.saveNewUser();
    this.authService.register(data.email, data.password)
      .subscribe(
        () => this.router.navigate(['home']),
        error => console.log(error)
      );
  };
}
