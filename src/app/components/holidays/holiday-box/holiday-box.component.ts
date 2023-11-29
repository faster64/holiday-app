import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackingModel } from 'src/app/models/base/tracking';
import { Holiday } from 'src/app/models/holiday/holiday';
import { DeviceType } from 'src/app/shared/enumerations/device.enum';
import { TrackingService } from 'src/app/shared/services/base/tracking.service';

@Component({
  selector: 'app-holiday-box',
  templateUrl: './holiday-box.component.html',
  styleUrls: ['./holiday-box.component.scss']
})
export class HolidayBoxComponent implements OnInit {

  DeviceType = DeviceType;

  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  isShow = false;

  @Input("holiday")
  holiday: Holiday;

  @Input("device")
  device: DeviceType;

  constructor(
    public activatedRoute: ActivatedRoute,
    public trackingService: TrackingService,
  ) {

  }

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

  clickBox() {
    this.isShow = true;
    const model: TrackingModel = {
      ev: 'view-box',
      d: this.holiday.name,
      o: window.location.origin,
      p: (this.activatedRoute.snapshot as any)._routerState.url,
      sw: window.outerWidth,
      sh: window.outerHeight,
      siw: window.innerWidth,
      sih: window.innerHeight,
      l: window.navigator.language,
      ts: Math.floor(Date.now() / 1000)
    };
    this.trackingService
      .tracking(model)
      .subscribe(resp => console.log('tracking status:', resp));
  }
}
