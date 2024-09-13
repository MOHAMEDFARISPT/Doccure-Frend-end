import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTransform',
  standalone: true
})
export class DateTransformPipe implements PipeTransform {

  transform(value: string | Date, format: string = 'MMM d, y'): string | null {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, format);
  }

}
