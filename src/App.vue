<script>
import axios from 'axios';
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue'
const baseUri = 'http://localhost:8000/api/';

export default {
  name: 'Boolbnb',
  data: () => ({ apartments: [] }),
  components: { AppHeader },
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
  <AppHeader />
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
