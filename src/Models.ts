import { QuantityEnum } from './Enums';

export interface IngredientRequestModel {
  name: string;
  quantity: number;
  quantityType: QuantityEnum;
}

export interface RecipeRequestModel {
  name: string;
  preparingTime: number;
  servingsNumber: number;
  ingredients: IngredientRequestModel[];
}

export interface IngredientResponseModel extends IngredientRequestModel {
  _id: string;
}

export interface RecipeResponseModel extends Omit<RecipeRequestModel, 'ingredients'> {
  _id: string;
  ingredients: IngredientResponseModel[];
}
