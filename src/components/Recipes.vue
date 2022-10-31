<template>
  <v-row class="text-center">
    <v-col
      cols="12"
      lg="4"
      md="6"
      sm="12"
      xs="12"
      v-for="recipe in recipes"
      :key="recipe.name"
    >
      <RecipeItem :recipe="recipe" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { RecipModel } from '@/Models';
import { defineComponent } from 'vue';
import { api } from '@/api/axios';
import RecipeItem from '@/components/RecipeItem.vue';

export default defineComponent({
  data: () => ({
    recipes: [] as RecipModel[],
  }),
  mounted() {
    this.$nextTick(function () {
      api
        .get('http://localhost:3000/api/recipe/')
        .then((res) => {
          this.recipes = res.data.response;
        })
        .catch((err) => {
          console.log('err', err);
        });
    });
  },
  components: {
    RecipeItem,
  },
});
</script>
