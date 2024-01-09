import { Component, Injector } from '@angular/core';
import { takeUntil } from 'rxjs';
import { TrackingModel } from 'src/app/models/base/tracking';
import { SnackBarParameter } from 'src/app/models/snackbar.param';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { SnackBar } from 'src/app/shared/components/element/snackbar/snackbar.component';
import { HolidayService } from 'src/app/shared/services/holiday/holiday.service';

@Component({
  selector: 'app-convert-date',
  templateUrl: './convert-date.component.html',
  styleUrls: ['./convert-date.component.scss']
})
export class ConvertDateComponent extends BaseComponent {
  now = new Date(Date.now());
  d = this.now.getDay();
  m = this.now.getMonth() + 1;
  y = this.now.getFullYear();

  solar = `${this.d > 9 ? this.d : '0' + this.d}-${this.m > 9 ? this.m : '0' + this.m}-${this.y}`;
  lunar = '';

  constructor(
    injector: Injector,
    public holidayService: HolidayService
  ) {
    super(injector);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.convert(true);
  }

  override createModel() {
    const model: TrackingModel = {
      ev: 'view-converter',
      o: window.location.origin,
      p: (this.activatedRoute.snapshot as any)._routerState.url,
      sw: window.outerWidth,
      sh: window.outerHeight,
      siw: window.innerWidth,
      sih: window.innerHeight,
      l: window.navigator.language,
      ts: Math.floor(Date.now() / 1000)
    };
    return model;
  }

  convert(toLunar: boolean) {
    if (toLunar) {
      this.holidayService
        .convertToLunar(this.d, this.m, this.y)
        .pipe(takeUntil(this._onDestroySub))
        .subscribe(resp => {
          if (resp.code == 'success') {
            this.lunar = resp.data;
          } else {
            SnackBar.danger(new SnackBarParameter(this, resp.message));
          }
        });
    } else {
      this.holidayService
      .convertToSolar(this.d, this.m, this.y)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.solar = resp.data;
        } else {
          SnackBar.danger(new SnackBarParameter(this, resp.message));
        }
      });
    }
  }
}
