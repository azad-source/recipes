<template>
  <v-card width="100%" :elevation="6">
    <v-card-title :title="recipe.name">
      {{ recipe.name }}
    </v-card-title>
    <v-card-subtitle>Время: {{ recipe.preparingTime }} мин.</v-card-subtitle>
    <v-card-actions>
      <v-btn color="primary" @click="showEditModal = true">Изменить</v-btn>
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
              v-for="{ _id, name, quantity, quantityType } of recipe.ingredients"
              :key="_id"
              class="text-left"
              elevation="1"
            >
              {{ capitalizeCaption(name) }} &mdash;
              {{ `${quantityTypeCaption(quantityType)} ${quantity}` }}
            </v-list-item>
          </v-list>
        </v-card-text>
      </div>
    </v-expand-transition>
    <v-icon class="removeBtn" color="error" @click="$emit('removeRecipe', recipe._id)">
      mdi-delete-forever
    </v-icon>
  </v-card>
  <EditRecipeModal
    v-show="showEditModal"
    @close-modal="showEditModal = false"
    @save-modal="saveRecipe"
    :recipe="recipe"
    @remove="(recipe) => $emit('removeIngredient', recipe)"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { capitalize } from '@/helpers/stringHelper';
import { QuantityEnum, QuantityEnumDescription } from '@/Enums';
import { RecipeResponseModel } from '@/Models';
import EditRecipeModal from '@/components/EditRecipeModal.vue';

export default defineComponent({
  components: {
    EditRecipeModal,
  },
  props: {
    recipe: {
      required: true,
      type: Object as PropType<RecipeResponseModel>,
    },
  },
  data: () => ({
    show: false,
    showEditModal: false,
  }),
  methods: {
    capitalizeCaption: (val: string) => capitalize(val),
    quantityTypeCaption: (val: QuantityEnum) => QuantityEnumDescription[val],
    saveRecipe(recipe: RecipeResponseModel) {
      this.$emit('saveRecipe', recipe);
      this.showEditModal = false;
    },
  },
  emits: ['saveRecipe', 'removeIngredient', 'removeRecipe'],
});
</script>

<style scoped>
.removeBtn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
