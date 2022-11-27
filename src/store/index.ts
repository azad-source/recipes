import { IngredientResponseModel, RecipeResponseModel } from '@/Models';
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store, StoreOptions } from 'vuex';
import { getters } from '@/store/getters';
import { mutations } from '@/store/mutations';
import { actions } from '@/store/actions';
import { QuantityEnum } from '@/Enums';

export interface RootState {
  recipes: RecipeResponseModel[];
  recipe: RecipeResponseModel;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export function useStore() {
  return baseUseStore(key);
}

export const recipeBlank: RecipeResponseModel = {
  _id: '',
  name: '',
  preparingTime: 0,
  servingsNumber: 0,
  ingredients: [],
};

export const ingredientBlank: IngredientResponseModel = {
  _id: '',
  name: '',
  quantity: 0,
  quantityType: QuantityEnum.WEIGHT,
};

const state: RootState = {
  recipes: [],
  recipe: recipeBlank,
};

const store: StoreOptions<RootState> = {
  state,
  getters,
  mutations,
  actions,
  // modules: {},
};

export default createStore<RootState>(store);
