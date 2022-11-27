<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="2" class="d-flex flex-column">
        <v-btn color="primary" @click="showAddModal = true">Добавить</v-btn>
        <v-btn color="primary" @click="showRandomRecipeModal = true" class="mt-2"
          >Рандом</v-btn
        >
      </v-col>
      <v-col cols="12" md="10">
        <Recipes
          :items="allRecipes"
          @saveRecipe="editRecipe"
          @removeRecipe="removeRecipe"
          @removeIngr="removeIngr"
        />
      </v-col>
    </v-row>
  </v-container>
  <AddRecipeModal
    v-if="showAddModal"
    @closeModal="showAddModal = false"
    @saveModal="addRecipe"
    @remove="editRecipe"
  />
  <RandomRecipeModal
    v-if="showRandomRecipeModal"
    @closeModal="showRandomRecipeModal = false"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Recipes from '@/components/Recipes.vue';
import AddRecipeModal from '@/components/AddRecipeModal.vue';
import RandomRecipeModal from '@/components/RandomRecipeModal.vue';
import { RecipeRequestModel } from '@/Models';
import { ActionTypes } from '@/store/actions';

export default defineComponent({
  name: 'HomeView',
  components: {
    Recipes,
    AddRecipeModal,
    RandomRecipeModal,
  },
  computed: {
    allRecipes() {
      return this.$store.state.recipes;
    },
  },
  data: () => ({
    showAddModal: false,
    showRandomRecipeModal: false,
  }),
  methods: {
    getRecipes() {
      this.$store.dispatch(ActionTypes.GET_RECIPES);
    },
    addRecipe(recipe: RecipeRequestModel) {
      console.log('recipe', recipe);
      this.$store.dispatch(ActionTypes.ADD_RECIPE, recipe).then(() => {
        this.showAddModal = false;
      });
    },
    editRecipe(recipe: RecipeRequestModel) {
      this.$store.dispatch(ActionTypes.UPDATE_RECIPE_BY_ID, recipe).then(() => {
        this.showAddModal = false;
      });
    },
    removeRecipe(recipeID: string) {
      this.$store.dispatch(ActionTypes.REMOVE_RECIPE_BY_ID, recipeID);
    },
    removeIngr(recipe: RecipeRequestModel) {
      this.$store.dispatch(ActionTypes.UPDATE_RECIPE_BY_ID, recipe);
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.getRecipes();
    });
  },
});
</script>
