<script>
import axios from 'axios';
import { store } from '../data/store';
import AppLoader from '../components/AppLoader.vue';
import AppAlert from '../components/AppAlert.vue';
import ShowCard from '../components/apartments/ShowCard.vue';

export default {
    name: 'ShowPage',
    components: { AppLoader, AppAlert, ShowCard },
    data: () => ({
        store,
        apartment: null
    }),
    methods: {
        getApartment() {
            store.isLoading = true;
            axios.get(store.baseUri + this.$route.params.slug)
                .then(res => { this.apartment = res.data })
                .catch(err => { console.error(err) })
                .then(() => {
                    store.isLoading = false;
                    console.log(this.apartment)
                });
        }
    },
    computed: {
        // No computed atm
    },
    created() {
        this.getApartment();
    }
}
</script>

<template>
    <h1 class="py-3 text-center">SHOW APPARTAMENTO</h1>
    <AppLoader v-if="store.isLoading" />
    <ShowCard v-else-if="!store.isLoading && apartment" :apartment="apartment" />
</template>

<style></style>
