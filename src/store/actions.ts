import { api, retrieveData } from '@/api/axios';
import { RecipeRequestModel, RecipeResponseModel } from '@/Models';
import { ActionTree } from 'vuex';
import { RootState } from '.';

export enum ActionTypes {
  GET_RECIPES = 'GET_RECIPES',
  GET_RECIPE_BY_ID = 'GET_RECIPE_BY_ID',
  GET_RANDOM_RECIPE = 'GET_RANDOM_RECIPE',
  ADD_RECIPE = 'ADD_RECIPE',
  UPDATE_RECIPE_BY_ID = 'UPDATE_RECIPE_BY_ID',
  REMOVE_RECIPE_BY_ID = 'REMOVE_RECIPE_BY_ID',
}

export const actions: ActionTree<RootState, RootState> = {
  [ActionTypes.GET_RECIPES]({ commit }): Promise<RecipeResponseModel[]> {
    return api
      .get<RecipeResponseModel[]>('/getAll/')
      .then(retrieveData)
      .then((res) => {
        commit(ActionTypes.GET_RECIPES, res);
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  [ActionTypes.GET_RECIPE_BY_ID]({ commit }): Promise<RecipeResponseModel> {
    return api
      .get<RecipeResponseModel>('/getById/')
      .then(retrieveData)
      .then((res) => {
        commit(ActionTypes.GET_RECIPE_BY_ID, res);
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  [ActionTypes.GET_RANDOM_RECIPE](): Promise<RecipeResponseModel> {
    return api
      .get<RecipeResponseModel>('/getRandomOne/')
      .then(retrieveData)
      .then((res) => res)
      .catch((err) => {
        throw new Error(err);
      });
  },
  [ActionTypes.ADD_RECIPE](
    { commit },
    recipe: RecipeRequestModel,
  ): Promise<RecipeResponseModel> {
    return api
      .post<RecipeResponseModel>('/add/', recipe)
      .then(retrieveData)
      .then((res) => {
        commit(ActionTypes.ADD_RECIPE, res);
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  [ActionTypes.UPDATE_RECIPE_BY_ID](
    { commit },
    recipe: RecipeRequestModel,
  ): Promise<RecipeResponseModel> {
    return api
      .post<RecipeResponseModel>(`/updateById/`, recipe)
      .then(retrieveData)
      .then((res) => {
        commit(ActionTypes.UPDATE_RECIPE_BY_ID, res);
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
  [ActionTypes.REMOVE_RECIPE_BY_ID]({ commit }, recipeID: string): Promise<boolean> {
    return api
      .post<boolean>(`/removeById/`, { recipeID })
      .then(retrieveData)
      .then((res) => {
        commit(ActionTypes.REMOVE_RECIPE_BY_ID, recipeID);
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  },
};
