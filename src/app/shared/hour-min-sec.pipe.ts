import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourMinSec',
})
export class HourMinSecPipe implements PipeTransform {
  transform(value: number): string {
    let temp = value;
    const hours = Math.floor(temp / 3600);
    temp -= hours * 3600;
    const minutes: number = Math.floor(temp / 60);
    temp -= minutes * 60;
    const seconds = Math.floor((temp % 3600) % 60);
    return `
    ${hours > 0 ? hours + 'h' : ''}
    ${minutes > 0 ? ' ' + minutes + 'm' : ''}
    ${seconds > 0 ? ' ' + seconds + 's' : ''}
    `;
  }
}
