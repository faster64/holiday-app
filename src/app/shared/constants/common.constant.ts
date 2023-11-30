import { RoutingConfig } from "../../models/base/routing-config.model";
import { IndustryApp } from "./industry-app.constant";

export class Routing {
  public static readonly TET_COUNTDOWN = new RoutingConfig('con-bao-nhieu-ngay-nua-la-den-tet', 'TET_COUNTDOWN', IndustryApp.NONE);
  public static readonly LIST_HOLIDAYS = new RoutingConfig('danh-sach-cac-ngay-le-o-viet-nam', 'LIST_HOLIDAYS', IndustryApp.NONE);
  public static readonly API = new RoutingConfig('api', 'API', IndustryApp.NONE);
}

export const CommonRedirect = Routing.TET_COUNTDOWN.path;
export const ChangeIndustryRedirectModule = [
  {
    industry: IndustryApp.NONE,
    path: Routing.TET_COUNTDOWN.path
  },
]

export class BreakPoint {
  public static SM = 576;
  public static MD = 768;
  public static LG = 992;
  public static XL = 1200;
  public static XXL = 1400;
}
