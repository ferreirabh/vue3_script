<script setup>
import HelloWorld from './components/List.vue'
import { RouterView } from 'vue-router';

</script>

<template>
  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped>
.container {
  width: 90%;
  margin: 1rem auto;
}

@media screen and (min-width: 600px) {
  .container {
    width: 80%;
  }
}
@media screen and (min-width: 768px) {
  .container {
    width: 70%;
  }
}

@media screen and (min-width: 900px) {
  .container {
    width: 60%;
  }
}
</style>