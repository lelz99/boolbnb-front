import { createRouter, createWebHistory } from "vue-router";

import FilteredPage from '../pages/FilteredPage.vue';
import HomePage from "../pages/HomePage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: HomePage },
        { path: '/filter', name: 'filter', component: FilteredPage },
    ]
})

export { router };