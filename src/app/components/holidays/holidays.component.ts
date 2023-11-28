import { Component, Injector } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Holiday } from 'src/app/models/holiday/holiday';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { HolidayService } from 'src/app/shared/services/holiday/holiday.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent extends BaseComponent {

  groups = {};

  hasDayOffGroup: Holiday[] = [];

  constructor(
    injector: Injector,
    public holidayService: HolidayService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.holidayService
      .getHolidays()
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(resp => {
        if (resp.status == 'success') {
          let holidays = resp.data as Holiday[];

          this.groups = {};
          this.hasDayOffGroup = holidays.filter(x => x.dayOffValue > 0);
          holidays = holidays.filter(x => !x.dayOffValue);

          holidays.forEach(holiday => {
            const key = `h${holiday.holidayCategoryId}`;

            if (this.groups[key]) {
              (this.groups[key] as Array<Holiday>).push(holiday);
            } else {
              this.groups[key] = [holiday];
            }
          });

          console.log(this.hasDayOffGroup);
          console.log(this.groups);
        }
      });
  }
}