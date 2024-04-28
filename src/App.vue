<script>
import axios from 'axios';
import HomePage from './components/HomePage.vue';
import AppHeader from './components/AppHeader.vue';
import AppAlert from './components/AppAlert.vue';
import ApartmentList from './components/apartments/ApartmentList.vue';
import { RouterView } from 'vue-router';
const baseUri = 'http://localhost:8000/api/';

export default {
  name: 'Boolbnb',
  components: {AppHeader, ApartmentList, AppAlert, HomePage},
  data: () => ({ apartments: [], isLoading: false, isAlertOpen: false }),
  methods: {

    fetchApartments() {
      this.isLoading = true;
      axios.get(baseUri + 'apartments/')
      .then(res => { 
        this.apartments = res.data;
        this.isAlertOpen = false;
      })
      .catch(err => {
        console.error(err);
        this.isAlertOpen = true;
      }).then(()=>{
        this.isLoading = false;
      })
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
    <AppAlert :show="isAlertOpen" @close="isAlertOpen = false"/>
    <AppLoader v-if="isLoading"/>
    <ApartmentList v-else :apartments="apartments"/>
    // <RouterView />
  </main>

</template>

<style lang="scss">
  @use'./assets/scss/style.scss'
</style>
