import { Pipe, PipeTransform } from '@angular/core';
import { Grocery, GroceryCat } from './grocery';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(groceries: Grocery[], category: GroceryCat): Grocery[] {
    return category === GroceryCat.ALL ? groceries : groceries.filter(product => product.category === category);
  }

}
