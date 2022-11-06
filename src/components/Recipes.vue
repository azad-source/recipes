<template>
  <v-row class="text-center">
    <v-col cols="12" lg="4" md="6" sm="12" xs="12" v-for="item in items" :key="item._id">
      <RecipeItem
        :recipe="item"
        @saveRecipe="(recipe) => $emit('saveRecipe', recipe)"
        @removeRecipe="(recipeID) => $emit('removeRecipe', recipeID)"
        @removeIngr="(recipe) => $emit('removeIngr', recipe)"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import RecipeItem from '@/components/RecipeItem.vue';
import { RecipeResponseModel } from '@/Models';

export default defineComponent({
  props: {
    items: {
      required: true,
      type: Object as PropType<RecipeResponseModel[]>,
    },
  },
  components: {
    RecipeItem,
  },
  emits: ['saveRecipe', 'removeIngr', 'removeRecipe'],
});
</script>
