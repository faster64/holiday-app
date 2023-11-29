import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpStatusCode
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ServiceResult } from 'src/app/models/base/service-result';
import { ErrorModel } from '../../models/base/error';
import { Mark } from '../../models/core/mark';
import { NotificationType } from '../../models/core/notify-type.enum';
import { Message } from '../../models/message';
import { SnackBarParameter } from '../../models/snackbar.param';
import { MessageBox } from '../components/element/message-box/message-box.component';
import { SnackBar } from '../components/element/snackbar/snackbar.component';
import { StringHelper } from '../helpers/string.helper';
import { RequestErrorMapping } from './request-error-handler/request-mapping-handler';

@Injectable()
export class RequestHandlingInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.injectToken(request);
    return next.handle(request);
  }

  culture() {
    return "vi-VN";
  }

  injectToken(request: HttpRequest<unknown>) {
    const index = request.url.indexOf("://");
    const protocol = request.url.substring(0, index + 3);
    const path = request.url.substring(index + 3);

    const header = {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
    };

    header['X-Client-Time'] = Date.now() + "";
    header['Accept-Language'] = this.culture();

    return request.clone({
      setHeaders: header,
      url: protocol + (path as any).replaceAll('//', '/')
    });
  }
}
