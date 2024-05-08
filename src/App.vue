<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import { RouterView } from 'vue-router';


export default {
  name: 'Boolbnb',
  components: { AppHeader, AppFooter },


}
</script>


<template>
  <AppHeader />
  <main class="container-sm container-md container-lg container-xl container-xxl mt-3">
    <RouterView />
  </main>
<AppFooter />
</template>

<style lang="scss">
@use'./assets/scss/style.scss'
</style>
