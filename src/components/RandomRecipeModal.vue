<template>
  <Modal title="Случайный рецепт" @closeModal="$emit('closeModal')">
    <v-item-group class="mt-5">
      <div>{{ recipe?.name }}</div>
      <div>Время приготовления: {{ recipe?.preparingTime }}</div>
      <div>Кол-во порций: {{ recipe?.servingsNumber }}</div>
      <v-btn color="primary" @click="$emit('getRandomRecipe')">Другой</v-btn>
      <v-btn @click="$emit('closeModal')" class="ml-5">Закрыть</v-btn>
    </v-item-group>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Modal from '@/components/shared/Modal.vue';
import { RecipeResponseModel } from '@/Models';

export default defineComponent({
  props: {
    recipe: {
      require: true,
      type: Object as PropType<RecipeResponseModel>,
    },
  },
  components: {
    Modal,
  },
  emits: {
    getRandomRecipe: () => true,
    closeModal: () => true,
  },
});
</script>
