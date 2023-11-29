import { Component, Input, OnInit } from '@angular/core';
import { Holiday } from 'src/app/models/holiday/holiday';

@Component({
  selector: 'app-holiday-box',
  templateUrl: './holiday-box.component.html',
  styleUrls: ['./holiday-box.component.scss']
})
export class HolidayBoxComponent implements OnInit {

  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  isShow = false;

  @Input("holiday")
  holiday: Holiday;

  ngOnInit(): void {
    this.setCountDown(this.holiday.remainingSeconds);
  }

  setCountDown(time: number) {
    this.updateTime(time--);
    setInterval(() => {
      this.updateTime(time--);
    }, 1000);
  }

  updateTime(time: number) {
    this.seconds = time;

    this.days = Math.floor(this.seconds / 86400);
    this.seconds -= this.days * 86400;

    this.hours = Math.floor(this.seconds / 3600);
    this.seconds -= this.hours * 3600;

    this.minutes = Math.floor(this.seconds / 60);
    this.seconds -= this.minutes * 60;
  }
}
