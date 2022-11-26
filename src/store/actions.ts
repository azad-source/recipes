import { api, retrieveData } from '@/api/axios';
import { RecipeRequestModel, RecipeResponseModel } from '@/Models';
import { ActionTree } from 'vuex';
import { RootState } from '.';
import { RootMutations } from './mutations';

export enum ActionTypes {
  GET_RECIPES = 'GET_RECIPES',
  ADD_RECIPE = 'ADD_RECIPE',
  EDIT_RECIPE = 'EDIT_RECIPE',
  REMOVE_RECIPE = 'REMOVE_RECIPE',
}

export const actions: ActionTree<RootState, RootState> = {
  [ActionTypes.GET_RECIPES]({ commit }): Promise<RecipeResponseModel[]> {
    return api
      .get<RecipeResponseModel[]>('/')
      .then(retrieveData)
      .then((res) => {
        commit(RootMutations.UPDATE_RECIPES, res);
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  [ActionTypes.ADD_RECIPE](
    { commit },
    recipe: RecipeRequestModel,
  ): Promise<RecipeResponseModel> {
    return api
      .post<RecipeResponseModel>('/store/', recipe)
      .then(retrieveData)
      .then((res) => {
        commit(RootMutations.ADD_RECIPE, res);
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  [ActionTypes.EDIT_RECIPE](
    { commit },
    recipe: RecipeRequestModel,
  ): Promise<RecipeResponseModel> {
    return api
      .post<RecipeResponseModel>(`/update/`, recipe)
      .then(retrieveData)
      .then((res) => {
        commit(RootMutations.UPDATE_RECIPE, res);
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  [ActionTypes.REMOVE_RECIPE]({ commit }, recipeID: string): Promise<boolean> {
    return api
      .post<boolean>(`/remove/`, { recipeID })
      .then(retrieveData)
      .then((res) => {
        commit(RootMutations.REMOVE_RECIPE, recipeID);
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
};
