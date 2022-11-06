import { RecipeResponseModel } from '@/Models';
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store, StoreOptions } from 'vuex';
import { getters } from '@/store/getters';
import { mutations } from '@/store/mutations';
import { actions } from '@/store/actions';

export interface RootState {
  recipes: RecipeResponseModel[];
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export function useStore() {
  return baseUseStore(key);
}

const state: RootState = {
  recipes: [],
};

const store: StoreOptions<RootState> = {
  state,
  getters,
  mutations,
  actions,
  // modules: {},
};

export default createStore<RootState>(store);
