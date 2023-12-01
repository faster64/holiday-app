import { Component, Injector } from '@angular/core';
import { takeUntil } from 'rxjs';
import { TrackingModel } from 'src/app/models/base/tracking';
import { BaseComponent } from 'src/app/shared/components/base-component';
import { ApiDocumentationService } from 'src/app/shared/services/api-docs/api-docs.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent extends BaseComponent {

  apis: any[] = [];

  codeMirrorOptions: any = {
    mode: "text/x-mysql",
    indentWithTabs: true,
    smartIndent: true,
    lineNumbers: true,
    lineWrapping: false,
    extraKeys: { "Ctrl-Space": "autocomplete" },
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true
  };

  constructor(
    injector: Injector,
    public apiDocumentationService: ApiDocumentationService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getPublicApis();
  }

  override createModel() {
    const model: TrackingModel = {
      ev: 'view-api',
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

  getPublicApis() {
    this.isLoading = true;
    this.apiDocumentationService
      .getPublicApis()
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(resp => {
        this.isLoading = false;
        if (resp.status == 'success') {
          this.apis = resp.data;
        }
        console.log(resp);
      });
  }

  trackClickApi(apiUrl) {
    const model: TrackingModel = {
      ev: 'click-api',
      o: window.location.origin,
      p: (this.activatedRoute.snapshot as any)._routerState.url,
      sw: window.outerWidth,
      sh: window.outerHeight,
      siw: window.innerWidth,
      sih: window.innerHeight,
      l: window.navigator.language,
      ts: Math.floor(Date.now() / 1000),
      d: apiUrl
    };
    this.trackingService
      .tracking(model)
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(resp => console.log('tracking status:', resp));
  }
}
