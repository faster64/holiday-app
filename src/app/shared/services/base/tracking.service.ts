import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServiceResult } from "src/app/models/base/service-result";
import { environment } from "src/environments/environment";
import { HttpService } from "../base/http.service";
import { TrackingModel } from "src/app/models/base/tracking";

@Injectable({
  providedIn: 'root'
})
export class TrackingService extends HttpService {

  constructor(
    public override http: HttpClient
  ) {
    super(http);
  }

  public tracking(data: TrackingModel) {
    const url = `${environment.base_host}/tracking`;
    return this.post<string>(url, data);
  }
}
