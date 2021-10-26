export interface Grocery {
  name: string;
  price: number;
  category:GroceryCat;
  promo: boolean;
  inCart: number;
}
export enum GroceryCat {
  FRUIT_VEGETABLE = "Fruits & Vegetables",
  MEAT_FISH = "Meat & Fish",
  DAIRY = "Dairy",
  DRINKS = "Drinks",
  ALCOHOL = "Alcohol",
  CANDY = "Candy",
  BAKERY = "Bakery",
  FREEZER = "Freezer",
  NON_FOOD = "Non Food"
}
