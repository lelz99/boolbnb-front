<script>
import axios from 'axios';
import HomePage from './components/HomePage.vue';
const baseUri = 'http://localhost:8000/api/';

export default {
  name: 'Boolbnb',
  data: () => ({ apartments: [] }),
  components: { HomePage},
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
  <main>
  <div class="container py-5">
    <HomePage />
  </div>
  </main>
</template>

<style scoped></style>
