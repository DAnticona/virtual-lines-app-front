import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(timeString: string, format?: string) {
    let time: any;
    let hours: string;
    let minutes: string;
    let seconds: string;
    let ampm: string;

    if (timeString) {
      time = timeString.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:)([0-5]\d)?$/) || [timeString];

      if (time.length > 1) {
        time = time.slice(1);

        if (format) {
          switch (format) {
            case 'hh': {
              hours = (+time[0] % 12 || 12).toString();
              minutes = '';
              seconds = '';
              ampm = +time[0] < 12 ? ' AM' : ' PM';
              break;
            }
            case 'hh:mm': {
              hours = (+time[0] % 12 || 12).toString();
              minutes = `:${time[2]}`;
              seconds = '';
              ampm = +time[0] < 12 ? ' AM' : ' PM';
              break;
            }
            case 'hh:mm:ss': {
              hours = (+time[0] % 12 || 12).toString();
              minutes = `:${time[2]}`;
              seconds = `:${time[4]}`;
              ampm = +time[0] < 12 ? ' AM' : ' PM';
              break;
            }
            case 'HH': {
              hours = time[0];
              minutes = '';
              seconds = '';
              ampm = '';
              break;
            }
            case 'HH:mm': {
              hours = time[0];
              minutes = `:${time[2]}`;
              seconds = '';
              ampm = '';
              break;
            }
            case 'HH:mm:ss': {
              hours = time[0];
              minutes = `:${time[2]}`;
              seconds = `:${time[4]}`;
              ampm = '';
              break;
            }
            default: {
              hours = time[0];
              minutes = `:${time[2]}`;
              seconds = `:${time[4]}`;
              ampm = '';
              break;
            }
          }

          return hours + minutes + seconds + ampm;
        }

        return time.join('');
      }
      return time;
    } else {
      return null;
    }
  }
}
