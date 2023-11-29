import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Routing } from './shared/constants/common.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  Routing = Routing;

  inProgress = false;
  progressValue = 35;
  _onDestroySub: Subject<void> = new Subject<void>();
  lostConnection = false;

  path = '';

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    if (environment.production) {
      this.logGreeting();
    }
    this.handleRouteChange();
  }

  handleRouteChange() {
    this.router.events.pipe(takeUntil(this._onDestroySub)).subscribe(async (event: any) => {
      if (event instanceof NavigationStart) {
        this.inProgress = true;
        this.progressValue = 35;
        const id = setInterval(() => {
          if (this.progressValue >= 90) {
            clearInterval(id);
            return;
          }
          this.progressValue += 1;
        }, 20);
      }

      if (event instanceof NavigationEnd) {
        this.inProgress = false;
        this.path = (this.activatedRoute.snapshot as any)._routerState.url;
      }
    });
  }

  logGreeting() {
    console.log('%cContact for work!', 'font-size: 32px; font-weight: bold; color: red; padding: 0 32px');
    console.log('%cCương Nguyễn', 'font-size: 32px; font-weight: bold; color: red; padding: 0 32px');
    console.log('%cMail: cuongnguyen.ftdev@gmail.com', 'font-size: 32px; font-weight: bold; color: red; padding: 0 32px');
    console.log('%cPhone: 0847884444', 'font-size: 32px; font-weight: bold; color: red; padding: 0 32px');
  }

  ngOnDestroy(): void {
    // unsubscribe khi destroy
    if (this._onDestroySub) {
      this._onDestroySub.next();
      this._onDestroySub.complete();
      this._onDestroySub.unsubscribe();
    }
  }
}
