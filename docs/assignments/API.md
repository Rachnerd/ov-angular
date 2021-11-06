# Api

This api supports pagination.

```typescript
interface Paged<T> {
  results: T[];
  page: number;
  size: number;
  totalResults: number;
}
```

## Products

```typescript
interface Product {
  name: string;
  category: string;
  price: number;
  promo: boolean;
  id: string;
}
```

### Get

```
http://localhost:8080/products
```

Query params

| Name     | Type   | Description                 |
| -------- | ------ | --------------------------- |
| filter   | string | filters on product name     |
| category | string | filters on product category |
| page     | number | pagination index            |
| size     | number | pagination size             |

Response

- Collection of products
- Pagination object (only if `page` and `size` are present)

### Get by id

```
http://localhost:8080/products/1
```

Response

- Product

## Cart

```typescript
interface CartProduct extends Product {
  quantity: number;
  totalPrice: number;
}

interface Cart {
  products: CartProduct[];
  totalPrice: number;
}
```

### Get

```
http://localhost:8080/cart
```

Query params

| Name | Type   | Description      |
| ---- | ------ | ---------------- |
| page | number | pagination index |
| size | number | pagination size  |

Response

- Cart with total price and products
- Cart with total price and pagination object (only if `page` and `size` are present)

### Post

```
http://localhost:8080/cart
```

Body

| Name     | Type   | Description        |
| -------- | ------ | ------------------ |
| id       | string | product id         |
| quantity | number | amount of products |

Response

- 204

### Put

```
http://localhost:8080/cart/1
```

Body

| Name     | Type   | Description        |
| -------- | ------ | ------------------ |
| quantity | number | amount of products |

Response

- 204

### Delete

```
http://localhost:8080/cart/1
```

Response

- 204
