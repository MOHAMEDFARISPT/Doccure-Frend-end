import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true  
})
export class TimeFormatPipe implements PipeTransform {

  transform(time: string): string {

    const [hours, minutes] = time.split(':').map(Number);

 
    const period = hours >= 12 ? 'PM' : 'AM';


    const adjustedHours = hours % 12 || 12; 


    return `${this.pad(adjustedHours)}:${this.pad(minutes)} ${period}`;
  }


  private pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
