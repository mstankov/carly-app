import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    ViewProfileComponent
  ]
})
export class ProfileModule { }
