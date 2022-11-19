<template>
  <div class="modal-overlay">
    <v-row>
      <v-col
        cols="12"
        class="d-flex justify-center align-center"
        @click="$emit('closeModal')"
      >
        <div class="modal" @click.stop>
          <div class="modal-title">Добавление рецепта</div>
          <div class="px-5 py-8">
            <RecipeEditForm
              @save="save"
              @close="$emit('closeModal')"
              @remove="(recipe) => $emit('remove', recipe)"
              :isAdding="true"
            />
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RecipeEditForm from '@/components/RecipeEditForm.vue';
import { RecipeRequestModel } from '@/Models';

export default defineComponent({
  components: {
    RecipeEditForm,
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

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
  z-index: 10;
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
}

::-webkit-scrollbar {
  width: 0;
}

.modal-title {
  padding: 20px;
  text-align: left;
  background-color: rgb(98, 0, 238);
  color: #fff;
  box-sizing: border-box;
  font-size: 20px;
}

.modal {
  text-align: center;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
  width: 400px;
}

.close-img {
  width: 25px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
}

p {
  font-size: 16px;
}
</style>
