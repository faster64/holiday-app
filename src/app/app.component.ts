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
    this.eventSubscribe();
  }

  eventSubscribe() {
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
        console.log(this.activatedRoute);
        this.path = (this.activatedRoute.snapshot as any)._routerState.url;
      }
    });
  }

  logGreeting() {
    console.log('%cStop!', 'font-size: 64px; font-weight: bold; color: red; padding: 64px');
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
