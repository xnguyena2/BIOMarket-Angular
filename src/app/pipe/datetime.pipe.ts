import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    var date = new Date(value.toString());
    return date.toLocaleString();
  }

}
