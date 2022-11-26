<template>
  <Modal title="Изменение рецепта" @closeModal="$emit('closeModal')">
    <RecipeEditForm
      :existingRecipe="recipe"
      @save="saveRecipe"
      @close="$emit('closeModal')"
      @removeIngr="(recipe) => $emit('removeIngr', recipe)"
    />
  </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import RecipeEditForm from '@/components/RecipeEditForm.vue';
import Modal from '@/components/shared/Modal.vue';
import { RecipeRequestModel, RecipeResponseModel } from '@/Models';

export default defineComponent({
  components: {
    RecipeEditForm,
    Modal,
  },
  props: {
    recipe: {
      required: true,
      type: Object as PropType<RecipeResponseModel>,
    },
  },
  methods: {
    saveRecipe(item: RecipeRequestModel) {
      this.$emit('saveModal', item);
    },
  },
  emits: {
    removeIngr: (recipe: RecipeRequestModel) => true,
    saveModal: (recipe: RecipeRequestModel) => true,
    closeModal: () => true,
  },
});
</script>
