import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../interfaces/category.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(categoriesArray: ICategory[], field: string): unknown {
    if (!field) {
      return categoriesArray;
    }

    return categoriesArray.filter(
      category => category.name.toLowerCase().includes(field.toLowerCase().trim())
    );
  }

}
