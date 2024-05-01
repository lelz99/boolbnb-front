<script>
import axios from 'axios';
import { store } from '../data/store';
import AppLoader from '../components/AppLoader.vue';
import AppAlert from '../components/AppAlert.vue';

export default {
    name: 'FilteredPage',
    components: { ApartmentCard, ApartmentList, AppAlert },
    data() {
        return {
            store
        }
    },
    methods: {
        test(test) {
            console.log(test);
        },
    },
    computed: {
        // No computed atm
    },
    created() {
        this.test("test");
    }
}
</script>

<template></template>

<style></style>
