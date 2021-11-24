import { ProductsFilterPipe } from './products-filter.pipe';
import { createProductMock } from "../../shared/product.mock";

describe('ProductsFilterPipe', () => {
  const PRODUCTS_MOCK = [
    createProductMock({
      title: 'a'
    }),
    createProductMock({
      title: 'a'
    }),
    createProductMock({
      title: 'b'
    }),
    createProductMock({
      title: 'c'
    })
  ];

  it('create an instance', () => {
    const pipe = new ProductsFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter products based on title', () => {
    const pipe = new ProductsFilterPipe();
    expect(pipe.transform(PRODUCTS_MOCK, 'a')).toEqual([PRODUCTS_MOCK[0], PRODUCTS_MOCK[1]])
  });

  it('should return 0 products if 0 products are passed', () => {
    const pipe = new ProductsFilterPipe();
    expect(pipe.transform([], '')).toEqual([])
  });

  it('should not filter if the filter value is undefined', () => {
    const pipe = new ProductsFilterPipe();
    expect(pipe.transform(PRODUCTS_MOCK, undefined)).toEqual(PRODUCTS_MOCK)
  });
});
