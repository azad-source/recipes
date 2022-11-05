<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="2" class="d-flex flex-column">
        <v-btn color="primary" @click="showAddModal = true">Добавить</v-btn>
        <v-btn color="primary" class="mt-2">Рандом</v-btn>
      </v-col>
      <v-col cols="12" md="10">
        <Recipes :items="recipes" />
      </v-col>
    </v-row>
  </v-container>
  <AddRecipeModal
    v-show="showAddModal"
    @close-modal="showAddModal = false"
    @save-modal="(recipe) => saveRecipe(recipe)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import Recipes from '@/components/Recipes.vue';
import AddRecipeModal from '@/components/AddRecipeModal/AddRecipeModal.vue';
import { api, retrieveData } from '@/api/axios';
import { RecipeRequestModel, RecipeResponseModel } from '@/Models';

export default defineComponent({
  name: 'HomeView',
  components: {
    Recipes,
    AddRecipeModal,
  },
  data: () => ({
    showAddModal: false,
    recipes: [] as RecipeResponseModel[],
  }),
  mounted() {
    this.$nextTick(function () {
      api
        .get<RecipeResponseModel[]>('/')
        .then(retrieveData)
        .then((res) => {
          this.recipes = res;
        })
        .catch((err) => {
          console.log('err', err);
        });
    });
  },
  methods: {
    saveRecipe(recipe: RecipeRequestModel) {
      console.log('recipe', recipe);

      api
        .post<RecipeResponseModel>('/store/', recipe)
        .then(retrieveData)
        .then((res) => {
          this.recipes.unshift(res);
          this.showAddModal = false;
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
  },
});
</script>
