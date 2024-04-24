<script>
import axios from 'axios';
import AppHeader from './components/AppHeader.vue';
const baseUri = 'http://localhost:8000/api/';

export default {
  name: 'Boolbnb',
  components: {AppHeader},
  data: () => ({ apartments: [] }),
  methods: {

    fetchApartments() {
      axios.get(baseUri + 'apartments/').then(res => { this.apartments = res.data })
    }

  },
  created() {
    this.fetchApartments()
  }
}
</script>

<template>
  <AppHeader/>
  <main class="container mt-4">
    <ul>
    <li v-for="apartment in apartments" :key="apartment.id">{{ apartment.title }}</li>
  </ul>
  </main>
  
</template>

<style lang="scss">
  @use'./assets/scss/style.scss'
</style>
