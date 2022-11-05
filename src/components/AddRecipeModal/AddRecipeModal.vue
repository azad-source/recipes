<template>
  <div
    class="modal-overlay"
    @click="$emit('close-modal')"
    @keydown.esc="$emit('close-modal')"
  >
    <v-row @click.stop>
      <v-col cols="12" class="d-flex justify-center align-center">
        <div class="modal">
          <div class="modal-title">Добавление рецепта</div>
          <div class="px-5 py-8">
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
                class="px-4 pt-4 mt-4"
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
                <v-btn color="primary" @click="$emit('save-modal', recipe)"
                  >Сохранить</v-btn
                >
                <v-btn @click="$emit('close-modal')" class="ml-5">Закрыть</v-btn>
              </v-item-group>
            </v-form>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { QuantityEnum, QuantityEnumDescription } from '@/Enums';
import { RecipeRequestModel } from '@/Models';
import { validate } from '@babel/types';
import { defineComponent } from 'vue';
export default defineComponent({
  data: () => ({
    valid: true,
    recipe: {
      name: '',
      preparingTime: 0,
      servingsNumber: 0,
      ingredients: [{ name: '', quantity: 0, quantityType: QuantityEnum.WEIGHT }],
    } as RecipeRequestModel,
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
  // watch: {
  //   recipe: {
  //     handler(newValue, oldValue) {
  //       console.log('newValue', newValue);
  //       // this.$emit('edit', newValue);
  //     },
  //     deep: true,
  //   },
  // },
  methods: {
    getQuantityTypeCaption(item: string) {
      return QuantityEnumDescription[item as QuantityEnum];
    },
    addIngredient() {
      this.recipe.ingredients.push({
        name: '',
        quantity: 0,
        quantityType: QuantityEnum.WEIGHT,
      });
    },
    // editIngredient(item: IngredientModel, index: number) {
    //   // console.log('index', index);
    //   // console.log('item', item);
    //   this.recipe.ingredients[index] = item;
    // },
    quantityTypeCaption(type: QuantityEnum) {
      return QuantityEnumDescription[type];
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
  components: {},
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
