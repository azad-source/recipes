<template>
  <v-card width="100%" :elevation="6">
    <v-card-title :title="recipe.name">
      {{ recipe.name }}
    </v-card-title>
    <v-card-subtitle>Время: {{ recipe.preparingTime }} мин.</v-card-subtitle>
    <v-card-actions>
      <v-btn color="primary">Изменить</v-btn>
      <v-btn icon @click="show = !show" class="ml-auto">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          <v-list density="compact">
            <v-list-item
              v-for="{ name, quantity, weight } of recipe.ingredients"
              :key="name"
              class="text-left"
              elevation="1"
            >
              {{ capitalizeCaption(name) }} &mdash;
              {{ !!quantity ? `${quantity} шт.` : `${weight} гр.` }}
            </v-list-item>
          </v-list>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { capitalize } from '@/helpers/stringHelper';

export default defineComponent({
  props: ['recipe'],
  data: () => ({
    show: false,
  }),
  methods: {
    capitalizeCaption: (val: string) => capitalize(val),
  },
});
</script>
