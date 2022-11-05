<template>
  <v-row class="text-center">
    <v-col cols="12" lg="4" md="6" sm="12" xs="12" v-for="item in items" :key="item._id">
      <RecipeItem :recipe="item" />
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
  setup(props) {
    props.items;
  },
  components: {
    RecipeItem,
  },
});
</script>
