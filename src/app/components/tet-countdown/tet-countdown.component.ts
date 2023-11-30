import { Component, Injector, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Holiday } from 'src/app/models/holiday/holiday';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { DeviceType } from 'src/app/shared/enumerations/device.enum';
import { DateHelper } from 'src/app/shared/helpers/date.helper';
import { HolidayService } from 'src/app/shared/services/holiday/holiday.service';

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
  dayName = '';
  year = 0;
  canchi = '';
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
          this.tetHoliday = resp.data.find(x => x.date.split('-')[0] == '01' && x.date.split('-')[1] == '01' && !x.isSolar) as Holiday;
          const items = this.tetHoliday.nextSolar.split('-');
          const date = new Date(`${items[2]}-${items[1]}-${items[0]}`);

          this.dayName = DateHelper.getDayVietnamName(date);
          this.year = date.getFullYear();
          this.canchi = DateHelper.getCanChi(this.year);
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
