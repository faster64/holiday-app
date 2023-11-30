import { Directive, Injector, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { ButtonColor, ButtonType, IconButtonType } from "../constants/button.constant";
import { Routing } from "../constants/common.constant";
import { DeviceType } from "../enumerations/device.enum";
import { TrackingService } from "../services/base/tracking.service";
import { TrackingModel } from "src/app/models/base/tracking";


@Directive()
export class BaseComponent implements OnInit, OnDestroy {
  DeviceType = DeviceType;

  Routing = Routing;

  isLoading: boolean = false;

  public _onDestroySub: Subject<void> = new Subject<void>();
  public activatedRoute: ActivatedRoute;
  public trackingService: TrackingService;

  constructor(
    public injector: Injector
  ) { }

  ngOnInit() {
    this.initServices();
    this.initData();
  }

  // unsubscribe khi destroy
  ngOnDestroy() {
    if (this._onDestroySub) {
      this._onDestroySub.next();
      this._onDestroySub.complete();
      this._onDestroySub.unsubscribe();
    }
  }

  initData() {
    const model = this.createModel();
    this.trackingService
      .tracking(model)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(resp => console.log('tracking status:', resp));
  }

  initServices() {
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.trackingService = this.injector.get(TrackingService);
  }

  createModel() {
    const model: TrackingModel = {
      ev: 'view',
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
}
