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

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.TooManyRequests) {
          MessageBox.information(new Message(this, { content: "SPAM DETECTED!" }));
        } else {
          this.fireNotify(Mark.getMark(request.url), null, null);
        }
        return throwError(error.error);
      }),
      switchMap(response => this.checkErrorResponse(request, next, response)),
      switchMap(response => this.checkMessageResponse(response))
    );
  }

  culture() {
    return "vi-VN";
  }

  injectToken(request: HttpRequest<unknown>) {
    const index = request.url.indexOf("://");
    const protocol = request.url.substring(0, index + 3);
    const path = request.url.substring(index + 3);

    const header = {
      // 'Content-Type': 'application/json; charset=utf-8',
      // 'Accept': 'application/json',
      'Accept': '*/*',
    };

    header['X-Client-Time'] = Date.now() + "";
    header['Accept-Language'] = this.culture();

    return request.clone({
      setHeaders: header,
      url: protocol + (path as any).replaceAll('//', '/')
    });
  }

  /**
   * Kiểm tra response lỗi
   * @param request
   * @param next
   * @param response
   * @returns
   */
  checkErrorResponse(request: HttpRequest<unknown>, next: HttpHandler, response: HttpEvent<unknown>) {
    try {
      if (response.type != 0) {
        response = response as HttpResponse<unknown>;
        const result = response.body as ServiceResult;
        if (result && result.status != 'success') {
          switch (result.error?.code) {
            case HttpStatusCode.Forbidden:
              this.fireNotify(Mark.getMark(response.url), result.error, result.data);
              break;

            case HttpStatusCode.ServiceUnavailable:
              MessageBox.information(new Message(this, { content: "This service is currently under maintenance. Please try again in a few minutes!" }));
              break;
          }
        }
      }
    } catch (error) {
      console.log(``, error);
    }
    return of(response);
  }

  /**
   * Fire event notify nếu có trước khi transfer response
   * @param response
   */
  checkMessageResponse(response: HttpEvent<unknown>) {
    try {
      response = response as HttpResponse<unknown>;
      const result = response.body as ServiceResult;

      if (result && result.status == "error" && ![304, 307, 308, 403, 429, 503].includes(result.error?.code)) {
        this.fireNotify(Mark.getMark(response.url), result.error, result.data);
      }
    } catch (error) {
      console.log(``, error);
    }
    return of(response);
  }

  fireNotify(mark: Mark, error: ErrorModel, body: any) {
    if (mark.allowNotice) {
      if (error && !StringHelper.isNullOrEmpty(error.type)) {
        const handler = RequestErrorMapping.mapping.find(m => m.type == error.type);
        if (handler) {
          handler.func(error, body);
          return;
        }
      }

      const message = !StringHelper.isNullOrEmpty(error?.message) ? error?.message : "Lỗi chưa xác định";
      switch (mark.notificationType) {
        case NotificationType.MessageBox:
          MessageBox.information(new Message(null, { content: message }));
          break;
        case NotificationType.SnackBarWarning:
          SnackBar.warning(new SnackBarParameter(null, message));
          break;
        default:
          SnackBar.danger(new SnackBarParameter(null, message));
          break;
      }
    }
  }
}
