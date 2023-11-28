import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageBoxModule } from './shared/components/element/message-box/message-box.module';
import { SnackbarModule } from './shared/components/element/snackbar/snackbar.module';
import { RequestHandlingInterceptor } from './shared/core/request.interceptor';
import './shared/extension-methods/array-extension';
import './shared/extension-methods/console-extension';
import './shared/extension-methods/string-extension';
import { SharedModule } from './shared/shared.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'vi-VN',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    // BrowserTransferStateModule,
    SharedModule,
    SnackbarModule,
    MessageBoxModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestHandlingInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
