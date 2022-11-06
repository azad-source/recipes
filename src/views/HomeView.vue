<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="2" class="d-flex flex-column">
        <v-btn color="primary" @click="showAddModal = true">Добавить</v-btn>
        <v-btn color="primary" class="mt-2">Рандом</v-btn>
      </v-col>
      <v-col cols="12" md="10">
        <Recipes :items="allRecipes" @saveRecipe="() => 1" />
      </v-col>
    </v-row>
  </v-container>
  <!-- <AddRecipeModal
    v-show="showAddModal"
    @close-modal="showAddModal = false"
    @save-modal="(recipe) => saveRecipe(recipe)"
    @remove="removeIngredient"
  /> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Recipes from '@/components/Recipes.vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/actions';
// import AddRecipeModal from '@/components/AddRecipeModal.vue';
// import { api, retrieveData } from '@/api/axios';
// import { RecipeRequestModel, RecipeResponseModel } from '@/Models';

export default defineComponent({
  name: 'HomeView',
  components: {
    Recipes,
    // AddRecipeModal,
  },
  computed: {
    allRecipes() {
      return this.$store.state.recipes;
    },
  },
  data: () => ({
    showAddModal: false,
  }),
  methods: {
    getRecipes() {
      this.$store
        .dispatch(ActionTypes.GET_RECIPES)
        .then((res) => console.log('res', res));
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.getRecipes();
    });
  },
  setup() {
    // const store = useStore();
    // function getRecipes() {
    //   store.dispatch(ActionTypes.GET_RECIPES);
    // }
    // function addRecipe() {
    //   store.dispatch(ActionTypes.ADD_RECIPE);
    // }
    // function editRecipe() {
    //   store.dispatch(ActionTypes.EDIT_RECIPE);
    // }
    // function removeRecipe() {
    //   store.dispatch(ActionTypes.REMOVE_RECIPE);
    // }
    // return {
    //   getRecipes,
    //   addRecipe,
    //   editRecipe,
    //   removeRecipe,
    // };
  },
});
</script>
