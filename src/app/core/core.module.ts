import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { CarsModule } from '../modules/cars/cars.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    CarsModule
  ],
  declarations: [
    HomeComponent,
    FooterComponent,
    HeaderComponent
  ],
  exports: [
    HomeComponent,
    FooterComponent,
    HeaderComponent
  ]
})
export class CoreModule { }
