import { Normalized } from '../util/normalize';

interface CartProduct {
  id: string;
  quantity: number;
  totalPrice: number;
}

interface CartType {
  products: Normalized<CartProduct>;
  totalPrice: number;
}

export const Cart: CartType = {
  products: {
    allIds: [],
    byId: {},
  },
  totalPrice: 0,
};
