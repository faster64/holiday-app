import { Directive, Injector, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { ButtonColor, ButtonType, IconButtonType } from "../constants/button.constant";
import { Routing } from "../constants/common.constant";
import { DeviceType } from "../enumerations/device.enum";


@Directive()
export class BaseComponent implements OnInit, OnDestroy {

  ButtonType = ButtonType;

  ButtonColor = ButtonColor;

  IconButtonType = IconButtonType;

  DeviceType = DeviceType;

  Routing = Routing;

  isLoading: boolean = false;

  moduleKey = '';

  public _onDestroySub: Subject<void> = new Subject<void>();
  public activatedRoute: ActivatedRoute;
  public timerId: any;

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
    return;
  }

  initServices() {
    this.activatedRoute = this.injector.get(ActivatedRoute);
  }
}
