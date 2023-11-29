import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { HolidayService } from 'src/app/shared/services/holiday/holiday.service';
import { takeUntil } from 'rxjs';
import { Holiday } from 'src/app/models/holiday/holiday';
import { DeviceType } from 'src/app/shared/enumerations/device.enum';

@Component({
  selector: 'app-tet-countdown',
  templateUrl: './tet-countdown.component.html',
  styleUrls: ['./tet-countdown.component.scss']
})
export class TetCountdownComponent extends BaseComponent implements OnInit {
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  tetHoliday = new Holiday();
  device = DeviceType.Desktop;

  constructor(
    public override injector: Injector,
    public holidayService: HolidayService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.device = this.getDevice();
    this.getHolidays();
  }

  getHolidays() {
    if (this.holidayService.holidays && this.holidayService.holidays.length) {
      return;
    }
    this.holidayService
      .getHolidays()
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(resp => {
        if (resp.status == 'success') {
          this.tetHoliday = resp.data.find(x => x.isLunarTet) as Holiday;
          this.setTetHolidayTimer(this.tetHoliday.remainingSeconds - 1);
        }
      });
  }

  setTetHolidayTimer(time: number) {
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

  getDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return DeviceType.Mobile;
    }
    return DeviceType.Desktop;
  }
}
