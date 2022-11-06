import { QuantityEnum } from './Enums';

export interface IngredientRequestModel {
  name?: string;
  quantity?: number;
  quantityType?: QuantityEnum;
}

export interface RecipeRequestModel {
  recipeID?: string;
  name?: string;
  preparingTime?: number;
  servingsNumber?: number;
  ingredients?: IngredientRequestModel[];
}

export interface IngredientResponseModel extends IngredientRequestModel {
  _id: string;
  name: string;
  quantity: number;
  quantityType: QuantityEnum;
}

export interface RecipeResponseModel {
  _id: string;
  name: string;
  preparingTime: number;
  servingsNumber: number;
  ingredients: IngredientResponseModel[];
}
