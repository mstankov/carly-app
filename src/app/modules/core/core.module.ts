import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CarsModule } from '../cars/cars.module';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

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
