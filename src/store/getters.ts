import { RecipeResponseModel } from '@/Models';
import { GetterTree } from 'vuex';
import { RootState } from '.';

export const getters: GetterTree<RootState, RootState> = {
  allRecipes(state): RecipeResponseModel[] {
    return state.recipes;
  },
};
