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
        test(test) {
            console.log(test);
        },
        getApartment() {
            store.isLoading = true;
            axios.get(store.baseUri + this.$route.params.slug)
                .then(res => { this.apartment = res.data })
                .catch(err => { console.error(err) })
                .then(() => { store.isLoading = false });
        }
    },
    computed: {
        // No computed atm
    },
    created() {
        this.test("test");
        this.getApartment();
    }
}
</script>

<template>
    <h1 class="py-3 text-center">SHOW APPARTAMENTO</h1>
    <ShowCard v-if="!store.isLoading && apartment" :apartment="apartment" :isDetail="true" />
</template>

<style></style>
