import { Injectable } from "@angular/core";
import { ServiceResult } from "src/app/models/base/service-result";
import { Holiday } from "src/app/models/holiday/holiday";
import { environment } from "src/environments/environment";
import { HttpService } from "../base/http.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class HolidayService extends HttpService {

    holidays: Holiday[] = [];

    constructor(
        public override http: HttpClient
    ) {
        super(http);
    }

    public getHolidays() {
        const url = `${environment.base_host}/holidays?client=${Math.floor(Date.now() / 1000)}`;
        return this.get<ServiceResult>(url);
    }
}
