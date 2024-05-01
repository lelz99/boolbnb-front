<script>
import axios from 'axios';
import { store } from '../data/store';
import AppLoader from '../components/AppLoader.vue';
import AppAlert from '../components/AppAlert.vue';

export default {
    name: 'ShowPage',
    components: { AppLoader, AppAlert },
    data: () => ({
        store,
        apartment: null
    }),
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
