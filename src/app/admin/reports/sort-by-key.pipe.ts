import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByKey',
  standalone: true
})
export class SortByKeyPipe implements PipeTransform {
  transform(value: any, key: string = '', reverse: boolean = false): any[] {
    if (!value) {
      return [];
    }

    const array = Object.keys(value).map(k => ({ key: k, value: value[k] }));

    array.sort((a, b) => {
      let aValue = key ? a.value[key] : a.value;
      let bValue = key ? b.value[key] : b.value;
      let comparison = 0;
      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }
      return reverse ? (comparison * -1) : comparison;
    });

    return array;
  }
}