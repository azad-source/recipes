import { MutationTree } from 'vuex';
import { RootState } from '.';

export enum RootMutations {
  UPDATE_RECIPES = 'UPDATE_RECIPES',
  ADD_RECIPE = 'ADD_RECIPE',
  UPDATE_RECIPE = 'UPDATE_RECIPE',
  REMOVE_RECIPE = 'REMOVE_RECIPE',
}

export const mutations: MutationTree<RootState> = {
  [RootMutations.UPDATE_RECIPES](state, recipes) {
    state.recipes = recipes;
  },
  [RootMutations.ADD_RECIPE](state, recipe) {
    state.recipes.unshift(recipe);
  },
  [RootMutations.UPDATE_RECIPE](state, recipe) {
    state.recipes = state.recipes.map((item) => {
      if (item._id === recipe._id) {
        return recipe;
      }
      return item;
    });
  },
  [RootMutations.REMOVE_RECIPE](state, recipeID) {
    state.recipes = state.recipes.filter((item) => item._id !== recipeID);
  },
};
