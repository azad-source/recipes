<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="2" class="d-flex flex-column">
        <v-btn color="primary">Добавить</v-btn>
        <v-btn color="primary" class="mt-2">Рандом</v-btn>
      </v-col>
      <v-col cols="12" md="10">
        <Recipes />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import Recipes from '../components/Recipes.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    Recipes,
  },
});
</script>
