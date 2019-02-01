import { Component, OnInit } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  startCounting = (target: any) => {
    fromEvent(target, 'click')
      .pipe(switchMap(event => interval(1000)))
      .subscribe(value => console.log(value));
  }

}
