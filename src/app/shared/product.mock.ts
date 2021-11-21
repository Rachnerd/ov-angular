import { Product } from './product';

export const createProductMock = (product: Partial<Product> = {}): Product => ({
  price: 10,
  description: 'description',
  title: 'title',
  category: 'category',
  image: 'image',
  id: 1,
  rating: {
    count: 10,
    rate: 5,
  },
  ...product,
});
