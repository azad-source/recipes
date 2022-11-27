<template>
  <Modal title="Случайный рецепт" @closeModal="$emit('closeModal')">
    <v-item-group class="text-left">
      <div class="font-weight-bold text-center text-h5 mb-4">{{ recipe?.name }}</div>
      <div>Время приготовления: {{ recipe?.preparingTime }}</div>
      <div class="mb-5">Кол-во порций: {{ recipe?.servingsNumber }}</div>
      <table class="table">
        <thead>
          <tr class="text-center">
            <th>Ингр.</th>
            <th>Объем</th>
          </tr>
        </thead>
        <!-- <div class="d-flex justify-center font-weight-bold"></div> -->
        <tbody>
          <tr v-for="ingr in recipe?.ingredients" :key="ingr._id" class="text-center">
            <td>{{ ingr.name }}</td>
            <td>{{ ingr.quantity }} {{ ingr.quantityType }}</td>
          </tr>
        </tbody>
      </table>
    </v-item-group>
    <v-btn color="primary" @click="$emit('getRandomRecipe')">Другой</v-btn>
    <v-btn @click="$emit('closeModal')" class="ml-5">Закрыть</v-btn>
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

<style scoped>
.table {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid black;
}

.table th,
.table td {
  border: 1px solid black;
}
</style>
