import { MutationTree } from 'vuex';
import { RootState } from '.';
import { ActionTypes } from './actions';

export const mutations: MutationTree<RootState> = {
  [ActionTypes.GET_RECIPES](state, recipes) {
    state.recipes = recipes;
  },
  [ActionTypes.GET_RECIPE_BY_ID](state, recipe) {
    state.recipe = recipe;
  },
  [ActionTypes.ADD_RECIPE](state, recipe) {
    state.recipes.unshift(recipe);
  },
  [ActionTypes.UPDATE_RECIPE_BY_ID](state, recipe) {
    state.recipes = state.recipes.map((item) => {
      if (item._id === recipe._id) {
        return recipe;
      }
      return item;
    });
  },
  [ActionTypes.REMOVE_RECIPE_BY_ID](state, recipeID) {
    state.recipes = state.recipes.filter((item) => item._id !== recipeID);
  },
};
