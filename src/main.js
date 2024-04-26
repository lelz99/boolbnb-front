import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'
import AppLoader from './components/AppLoader.vue';

createApp(App)
.component('Apploader', AppLoader)
.mount('#app')
