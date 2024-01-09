import { Component, Injector } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Holiday } from 'src/app/models/holiday/holiday';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { DeviceType } from 'src/app/shared/enumerations/device.enum';
import { SharedService } from 'src/app/shared/services/base/shared.service';
import { HolidayService } from 'src/app/shared/services/holiday/holiday.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent extends BaseComponent {

  groups = {};

  hasDayOffGroup: Holiday[] = [];

  solarHolidays: Holiday[] = [];

  lunarHolidays: Holiday[] = [];

  constructor(
    injector: Injector,
    public holidayService: HolidayService,
    public sharedService: SharedService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.holidayService
      .getHolidays()
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(resp => {
        if (resp.code == 'success') {
          let holidays = resp.data as Holiday[];

          this.groups = {};
          this.hasDayOffGroup = holidays.filter(x => x.dayOffValue > 0);
          holidays = holidays.filter(x => !x.dayOffValue);

          this.solarHolidays = holidays.filter(x => x.isSolar);
          this.lunarHolidays = holidays.filter(x => !x.isSolar);
        }
      });
  }
}
