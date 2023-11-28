import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { DxFileUploaderModule, DxPopoverModule, DxProgressBarModule } from "devextreme-angular";
import { BaseLoadingModule } from "./components/micro/loading/loading.module";
import { CountDownPipe } from "./pipes/count-down.pipe";
import { DateTimeVietnamPipe } from "./pipes/date-time.pipe";
import { DateVietnamPipe } from "./pipes/date.pipe";
import { NumberFormatPipe } from "./pipes/number-format.pipe";
import { TimePipe } from "./pipes/time.pipe";

@NgModule({
  declarations: [
    DateVietnamPipe,
    DateTimeVietnamPipe,
    TimePipe,
    CountDownPipe,
    NumberFormatPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BaseLoadingModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    DxFileUploaderModule,
    DxProgressBarModule,
    DxPopoverModule,
    TranslateModule,
  ],
  exports: [
    BaseLoadingModule,
    DateVietnamPipe,
    DateTimeVietnamPipe,
    TimePipe,
    CountDownPipe,
    NumberFormatPipe,
    MatProgressBarModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    DxFileUploaderModule,
    DxProgressBarModule,
  ]
})
export class SharedModule { }
