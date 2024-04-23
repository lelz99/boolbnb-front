<script>
import axios from 'axios';
const baseUri = 'http://localhost:8000/api/';

export default {
  name: 'Boolbnb',
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
  <ul>
    <li v-for="apartment in apartments" :key="apartment.id">{{ apartment.title }}</li>
  </ul>
</template>

<style scoped></style>
