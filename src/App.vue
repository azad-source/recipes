<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',

  data() {
    return {
      //
    };
  },
});
</script>

<style>
::-webkit-scrollbar {
  width: 4px;
  height: 2em;
}
::-webkit-scrollbar-button {
  background: #eee;
}
::-webkit-scrollbar-track-piece {
  background: #ccc;
}
::-webkit-scrollbar-thumb {
  background: rgb(188, 188, 188);
}
</style>
