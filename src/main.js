import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { router } from './router'
import App from './App.vue'
import AppLoader from './components/AppLoader.vue';


createApp(App)
  .component('AppLoader', AppLoader)
  .use(router)
  .mount('#app')

