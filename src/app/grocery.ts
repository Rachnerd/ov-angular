export interface Grocery {
  name: string;
  price: number;
  category:GroceryCat;
  promo: boolean;
  inCart: number;
}

export enum GroceryCat {
  FRUIT_VEGETABLE = "fruit-vegetables",
  MEAT_FISH = "meat-fish",
  DAIRY = "dairy",
  DRINKS = "drinks",
  ALCOHOL = "alcohol",
  CANDY = "candy",
  BAKERY = "bakery",
  FREEZER = "freezer",
  NON_FOOD = "non-food"
}
