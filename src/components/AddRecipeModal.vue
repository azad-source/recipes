<template>
  <Modal title="Добавление рецепта" @closeModal="$emit('closeModal')">
    <RecipeEditForm
      @save="save"
      @close="$emit('closeModal')"
      @remove="(recipe) => $emit('remove', recipe)"
      :isAdding="true"
    />
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RecipeEditForm from '@/components/RecipeEditForm.vue';
import { RecipeRequestModel } from '@/Models';
import Modal from '@/components/shared/Modal.vue';

export default defineComponent({
  components: {
    RecipeEditForm,
    Modal,
  },
  emits: {
    remove: (recipe: RecipeRequestModel) => recipe,
    saveModal: (recipe: RecipeRequestModel) => recipe,
    closeModal: () => true,
  },
  methods: {
    save(recipe: RecipeRequestModel) {
      this.$emit('saveModal', recipe);
    },
  },
});
</script>
