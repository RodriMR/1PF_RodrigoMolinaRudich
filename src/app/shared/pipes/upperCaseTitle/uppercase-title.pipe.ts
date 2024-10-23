import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseTitle',
  standalone: true,
})
export class UppercaseTitlePipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}