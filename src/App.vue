<script>
import AppHeader from './components/AppHeader.vue';
import {RouterView} from 'vue-router';


export default {
  name: 'Boolbnb',
  components: {AppHeader},
  
  
}
</script>


<template>  
  <AppHeader/>
  <main class="container mt-4">
    <RouterView/>
  </main>

</template>

<style lang="scss">
  @use'./assets/scss/style.scss'
</style>
