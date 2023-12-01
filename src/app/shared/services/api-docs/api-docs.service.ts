import { Injectable } from "@angular/core";
import { ServiceResult } from "src/app/models/base/service-result";
import { Holiday } from "src/app/models/holiday/holiday";
import { environment } from "src/environments/environment";
import { HttpService } from "../base/http.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ApiDocumentationService extends HttpService {

    constructor(
        public override http: HttpClient
    ) {
        super(http);
    }

    public getPublicApis() {
        const url = `${environment.base_host}/documentation/public-apis`;
        return this.get<ServiceResult>(url);
    }
}
