import fastify from 'fastify';
import { PRODUCTS, PRODUCTS_NORMALIZED } from './data/products';
import { Cart } from './data/cart';
import { paginate } from './util/paginate';

const NodeCache = require('node-cache');
const cache = new NodeCache();

const CartKey = 'CART';

cache.set(CartKey, Cart);

const server = fastify();

server.register(require('fastify-cors'));

interface ProductsQueryParams {
  filter?: string;
  category?: string;
  page?: string;
  size?: string;
}

server.get('/products', async (request, reply) => {
  const {
    filter,
    category,
    page: pageParam,
    size: sizeParam,
  } = request.query as ProductsQueryParams;
  let products = PRODUCTS;
  if (category) {
    products = products.filter(
      ({ category: productCategory }) => productCategory === category
    );
  }

  if (filter) {
    products = products.filter(
      ({ title }) => title.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    );
  }

  if (sizeParam) {
    const page = parseInt(pageParam);
    const size = parseInt(sizeParam);

    if (isNaN(page) || isNaN(size)) {
      return reply.status(400).send('Bad query parameters');
    }

    return paginate(products, page, size);
  }
  return products;
});

interface ProductsGetByIdParams {
  id: string;
}
server.get('/products/:id', async (request, reply) => {
  const { id } = request.params as ProductsGetByIdParams;
  const product = PRODUCTS_NORMALIZED.byId[id];
  if (product === undefined) {
    return reply.status(404).send('Product not found');
  }
  return product;
});

const getCart = (): typeof Cart => cache.get(CartKey);
const setCart = (cart: typeof Cart): typeof Cart => cache.set(CartKey, cart);

interface CartGetParams {
  page?: string;
  size?: string;
}

server.get('/cart', async (request, reply) => {
  const { page: pageParam, size: sizeParam } = request.query as CartGetParams;
  const cart = getCart();
  let products = cart.products.allIds.map((id) => ({
    ...PRODUCTS_NORMALIZED.byId[id], // product
    ...cart.products.byId[id], // quantity + totalPrice
  }));

  if (sizeParam) {
    const page = parseInt(pageParam);
    const size = parseInt(sizeParam);

    if (isNaN(page) || isNaN(size)) {
      return reply.status(400).send('Bad query parameters');
    }

    return {
      ...cart,
      products: paginate(products, page, size),
    };
  }

  return {
    ...cart,
    products: products,
  };
});

interface CartPostBody {
  id: string;
  quantity: number;
}

server.post('/cart', async (request, reply) => {
  const { id, quantity } = request.body as CartPostBody;

  if (id === undefined || quantity === undefined) {
    return reply.status(400).send('Bad post body');
  }

  const cart = getCart();

  if (cart.products.byId[id]) {
    return reply.status(409).send('Cart item already exists');
  }

  cart.products.byId[id] = {
    id,
    quantity,
    totalPrice: PRODUCTS_NORMALIZED.byId[id].price * quantity,
  };
  cart.products.allIds.push(id);
  cart.totalPrice += cart.products.byId[id].totalPrice;
  setCart(cart);
  return reply.status(204).send();
});

server.put('/cart/:id', async (request, reply) => {
  const { quantity } = request.body as CartPostBody;
  const { id } = request.params as { id: string };

  if (id === undefined || quantity === undefined) {
    return reply.status(400).send('Bad post body');
  }

  const cart = getCart();

  if (cart.products.byId[id] === undefined) {
    cart.products.allIds.push(id);
  }

  cart.products.byId[id] = {
    id,
    quantity,
    totalPrice: PRODUCTS_NORMALIZED.byId[id].price * quantity,
  };
  cart.totalPrice += cart.products.byId[id].totalPrice;

  setCart(cart);
  return reply.status(204).send();
});

server.delete('/cart/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const cart = getCart();
  const cartItem = cart.products.byId[id];
  if (cartItem === undefined) {
    return reply.status(204).send();
  }
  ``;
  cart.products.allIds = cart.products.allIds.filter(
    (id) => id !== cartItem.id
  );
  cart.totalPrice -= cartItem.totalPrice;
  cart.products.byId[id] = undefined;
  setCart(cart);
  return reply.status(204).send();
});

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
