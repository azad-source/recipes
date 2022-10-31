export interface IngredientSchema {
  name: string;
  weight: number;
  quantity: number;
  teaSpoon: number;
  tablespoon: number;
  volume: number;
}

export interface RecipModel {
  name: string;
  preparingTime: number;
  servingsNumber: number;
  ingredients: IngredientSchema[];
}
