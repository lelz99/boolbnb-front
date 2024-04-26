<script>
import axios from 'axios';
import HomePage from './components/HomePage.vue';
import AppHeader from './components/AppHeader.vue';
import PostList from './components/apartments/ApartmentList.vue'
import AppAlert from './components/AppAlert.vue';
const baseUri = 'http://localhost:8000/api/';

export default {
  name: 'Boolbnb',
  data: () => ({ apartments: [] }),
  components: { HomePage},
  components: {AppHeader, PostList, AppAlert},
  data: () => ({ apartments: [], isLoading: false, isAlertOpen: false }),
  methods: {

    fetchApartments() {
      this.isLoading = true;
      axios.get(baseUri + 'apartments/')
      .then(res => { this.apartments = res.data })
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
    <AppAlert :show="isAlertOpen" @close=""/>
    <AppLoader v-if="isLoading"/>
    <PostList v-else :apartments="apartments"/>
  </main>

</template>

<style lang="scss">
  @use'./assets/scss/style.scss'
</style>
