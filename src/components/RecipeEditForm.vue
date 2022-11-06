<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="recipe.name"
      :counter="200"
      :rules="recipeNameRules"
      label="Название рецепта"
      required
      density="compact"
      color="primary"
      variant="underlined"
    />

    <v-text-field
      v-model="recipe.preparingTime"
      label="Время приготовления (мин.)"
      required
      type="number"
      density="compact"
      color="primary"
      variant="underlined"
    />

    <v-text-field
      v-model="recipe.servingsNumber"
      label="Количество порций"
      required
      type="number"
      density="compact"
      color="primary"
      variant="underlined"
    />

    <div class="text-left mt-4 mb-2">Ингредиенты:</div>

    <v-card
      v-for="(ingredient, index) in recipe.ingredients"
      :key="index"
      class="px-4 pt-4 mt-4 relative"
      elevation="2"
    >
      <v-text-field
        v-model="ingredient.name"
        :rules="[(v:number) => !!v || 'You must agree to continue!']"
        label="Название"
        required
        density="compact"
        color="primary"
        variant="underlined"
        class="pb-0"
      />
      <v-item-group class="d-flex">
        <v-text-field
          v-model="recipe.ingredients[index].quantity"
          :rules="[(v:number) => !!v || 'You must agree to continue!']"
          label="Объем"
          required
          type="number"
          density="compact"
          color="primary"
          variant="underlined"
        />
        <v-select
          v-model="recipe.ingredients[index].quantityType"
          :value="quantityTypeCaption(ingredient.quantityType)"
          :title="ingredient.quantityType"
          :items="quantityTypes"
          :rules="[(v:QuantityEnum) => !!v || 'Item is required']"
          required
          density="compact"
          class="ml-5"
          color="primary"
        />
      </v-item-group>
      <v-icon
        class="removeBtn"
        color="error"
        @click="removeIngredientById(ingredient._id)"
        >mdi-delete-forever</v-icon
      >
    </v-card>

    <v-btn @click="addIngredient" color="success" class="my-4"
      >Добавить еще ингредиент</v-btn
    >

    <!-- <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                Validate
              </v-btn>
              <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
              <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn> -->
    <v-item-group class="mt-5">
      <v-btn color="primary" @click="$emit('save', recipe)">Сохранить</v-btn>
      <v-btn @click="$emit('close')" class="ml-5">Закрыть</v-btn>
    </v-item-group>
  </v-form>
</template>

<script lang="ts">
import { QuantityEnum, QuantityEnumDescription } from '@/Enums';
import { RecipeRequestModel, RecipeResponseModel } from '@/Models';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    existingRecipe: {
      type: Object as PropType<RecipeResponseModel>,
    },
    isAdding: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    valid: true,
    recipe: {
      name: '',
      preparingTime: 0,
      servingsNumber: 0,
      ingredients: [{ name: '', quantity: 0, quantityType: QuantityEnum.WEIGHT }],
    } as RecipeResponseModel,
    recipeNameRules: [
      (v: string) => !!v || 'Название необходимо указать',
      (v: string) =>
        (v && v.length <= 200) || 'Название не должно превышать 200 символов',
    ],
    quantityTypes: Object.values(QuantityEnum).map((key) => ({
      value: key,
      title: QuantityEnumDescription[key],
    })),
  }),
  methods: {
    getQuantityTypeCaption(item: string) {
      return QuantityEnumDescription[item as QuantityEnum];
    },
    addIngredient() {
      this.recipe.ingredients.push({
        _id: '',
        name: '',
        quantity: 0,
        quantityType: QuantityEnum.WEIGHT,
      });
    },
    quantityTypeCaption(type: QuantityEnum) {
      return QuantityEnumDescription[type];
    },
    removeIngredientById(id: string) {
      const newRecipe = { ...this.recipe };
      const newIngredients = this.recipe.ingredients.filter((item) => item._id !== id);
      if (!this.isAdding) {
        newRecipe.ingredients = newIngredients;
        this.$emit('save', newRecipe);
      }
      this.recipe.ingredients = newIngredients;
    },
    // validate() {
    //   this.$refs.form.validate();
    // },
    // reset() {
    //   this.$refs.form.reset();
    // },
    // resetValidation() {
    //   this.$refs.form.resetValidation();
    // },
  },
  mounted() {
    if (this.existingRecipe) {
      this.recipe = this.existingRecipe;
    }
  },
});
</script>

<style scoped>
.removeBtn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
