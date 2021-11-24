import { Pipe, PipeTransform } from '@angular/core';
import { Product } from "../../shared/product";

@Pipe({
  name: 'productsFilter'
})
export class ProductsFilterPipe implements PipeTransform {

  transform(products: Product[], filter: string = ''): Product[] {
    const filterLowercase = filter.toLowerCase();
    return products.filter(({title}) => title.toLowerCase().indexOf(filterLowercase) !== -1);
  }

}
