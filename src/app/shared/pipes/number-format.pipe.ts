
import { Pipe, PipeTransform } from '@angular/core';
import { StringHelper } from '../helpers/string.helper';

@Pipe({ name: 'NumberFormatPipe' })
export class NumberFormatPipe implements PipeTransform {
  transform(value: string | number): string {
    if (StringHelper.isNullOrEmpty(value + '')) {
      return '';
    }

    const re = '\\d(?=(\\d{3})+$)';
    return parseInt(value + "").toFixed(Math.max(0, ~~0)).replace(new RegExp(re, 'g'), '$&,');
  }
}
