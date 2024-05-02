<script>
import axios from 'axios';
import { store } from '../data/store';
import AppLoader from '../components/AppLoader.vue';
import AppAlert from '../components/AppAlert.vue';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
// import mapMarker from '../data/map-marker';

const API_KEY = '82X2Cl2U4NDmOxA8fgnGKju65G1vKsqh';
const messageEndpoint = 'http://localhost:8000/api/messages/';
const defaultForm = { email: '', namesurname: '', message: '' };

export default {
    name: 'ShowPage',
    components: { AppLoader, AppAlert },
    data: () => ({
        store,
        apartment: null,
        form: defaultForm,
        successMessage: null,

    }),
    methods: {
        getApartment() {
            store.isLoading = true;
            axios.get(store.baseUri + this.$route.params.slug)
                .then(res => {
                    this.apartment = res.data;
                })
                .catch(err => { console.error(err) })
                .then(() => {
                    store.isLoading = false;
                })
                .finally(() => {
                    console.log(this.apartment);
                    this.mapMarker();
                });
        },
        mapMarker() {
            const lat = this.apartment.latitude;
            const lng = this.apartment.longitude;

            const yourApartment = {
                lat: lat,
                lng: lng
            };

            // Predispongo le variabili per mappa
            let map = tt.map({
                key: API_KEY,
                container: 'map-div',
                center: yourApartment,
                zoom: 13
            });

            // Inserisco il marker
            let customMarker = new tt.Marker({
                element: createCustomMarkerElement('#172BA1'),
            })
                .setLngLat([lng, lat])
                .addTo(map);

            // Custom Marker
            function createCustomMarkerElement(color) {
                let markerElement = document.createElement('div');
                markerElement.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="24px" height="24px">
                    <path d="M0 0h24v24H0V0z" fill="none"/> 
                    <path d="M11.99 2c-4.41 0-8 3.59-8 8 0 5.25 8 14 8 14s8-8.75 8-14c0-4.41-3.59-8-8-8zm0 12.75c-1.48 0-2.68-1.2-2.68-2.68s1.2-2.68 2.68-2.68 2.68 1.2 2.68 2.68-1.2 2.68-2.68 2.68z"/>
                </svg>
                `;
                return markerElement;
            }
        },
        sendForm() {
            store.isLoading = true;
            axios.post(messageEndpoint, this.form)
                .then(() => { this.form = { ...defaultForm } })
                .catch(err => { console.error(err) })
                .then(() => { store.isLoading = false });
        }
    },
    created() {
        this.getApartment();
    }
}
</script>

<template>
    <AppLoader v-if="store.isLoading" />
    <div v-else-if="!store.isLoading && apartment" class="container" id="show">
        <header class="mt-3">
            <h1 class="text-center m-0">{{ apartment.title }}</h1>
        </header>
        <!-- immagine -->
        <section id="eye-catcher" class="pb-3">
            <div class="mb-3 row justify-content-center">
                <div class="row justify-content-center img-container col-lg-8 overflow-hidden">
                    <img :src="apartment.cover_image" :alt="apartment.title">
                </div>
                <!-- descrizione a comparsa in large -->
                <div id="description" class="d-none d-lg-block col-lg-4 pt-1 ps-4">
                    <h3 class="text-center pb-1 mb-2 bottom-border">Descrizione</h3>
                    <p class="m-0">{{ apartment.description }}</p>
                </div>
            </div>
            <!-- bottone indietro -->
            <div class="d-flex justify-content-evenly pb-3">
                <RouterLink :to="{ name: 'home' }" class="btn btn-secondary btn-sm"><i
                        class="fas fa-arrow-left me-2 d-none d-sm-inline"></i>Indietro</RouterLink>
                <!-- bottone invia messaggio -->
                <a href="#" class="btn btn-primary btn-sm">
                    <i class="fas fa-comments me-2 d-none d-sm-inline"></i>
                    Contattal'host</a>
            </div>
            <div class="row justify-content-center text-center flex-column">
                <p class="m-0">{{ apartment.address }}</p>
                <p class="m-0"><a href="#apartment-map">Trova su mappa <i class="fa-solid fa-chevron-down"></i></a></p>
            </div>
        </section>
        <!-- proprietà -->
        <section id="details" class="pb-3 details-img">
            <h3 class="text-center pb-1 mb-3 bottom-border">Dettagli</h3>
            <ul class="row m-0 row-cols-1 row-cols-sm-2 row-cols-xl-4 list-unstyled">
                <li><span><i class="fa-solid fa-ruler-combined me-2 brand-color"></i> Metri quadri:
                        {{ apartment.square_meters }}</span></li>
                <li><span><i class="fa-solid fa-door-closed me-2 brand-color"></i> Numero stanze:
                        {{ apartment.rooms }}</span></li>
                <li><span><i class="fa-solid fa-bed me-2 brand-color"></i> Camere da letto: {{ apartment.beds }}
                    </span></li>
                <li><span><i class="fa-solid fa-bath me-2 brand-color"></i> Numero bagni: {{ apartment.baths }}
                    </span></li>
            </ul>
        </section>
        <!-- servizi -->
        <section id="services" class="pb-3">
            <h3 class="text-center pb-1 mb-3 bottom-border">Servizi</h3>
            <ul class="row m-0 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 list-unstyled">

                <li v-for="service in  apartment.services "><span><i :class="`${service.icon} me-2 brand-color`"></i>
                        {{ service.label }}</span></li>
            </ul>
        </section>
        <!-- descrizione -->
        <section id="description" class="pb-3 d-lg-none">
            <h3 class="text-center pb-1 mb-3 bottom-border">Descrizione</h3>
            <p class="m-0">{{ apartment.description }}</p>
        </section>
        <!-- mappa -->
        <section id="apartment-map" class="pb-3">
            <h3 class="text-center pb-1 mb-3 bottom-border">Dove sarai</h3>
            <div id="map-div"></div>
        </section>
        <!-- invia messaggio -->
        <section id="message-area" class="pb-3">
            <form @submit.prevent="sendForm">
                <h3 class="text-center pb-1 mb-3 bottom-border">Contatta l'host</h3>
                <div class="mb-3">
                    <label for="namesurname" class="form-label">Nome e Cognome<sup class="text-danger">*</sup></label>
                    <input type="text" class="form-control" name="namesurname" id="namesurname"
                        placeholder="Mario Rossi" v-model.trim="form.namesurname" required>
                </div>
                <div class="mb-3">
                    <label for="message-email" class="form-label">Indirizzo Mail<sup class="text-danger">*</sup></label>
                    <input type="email" class="form-control" name="message-email" id="message-email"
                        placeholder="email@esempio.com" v-model.trim="form.email" required>
                    <small class="form-text text-muted">Ti ricontatteremo a questo indirizzo</small>
                </div>
                <div class="mb-3">
                    <label for="message" class="form-label">Corpo del messaggio<sup class="text-danger">*</sup></label>
                    <textarea class="form-control" name="message" id="message" rows="3" v-model.trim="form.message"
                        required></textarea>
                </div>
                <button class="btn btn-primary" type="submit">Invia Messaggio</button>
            </form>
        </section>

    </div>
</template>

<style lang="scss">
/*utilities*/
.bottom-border {
    border-bottom: 1px #172BA1 solid;
}

/*styling elements*/
#show>* {
    background-color: white;
    border-radius: 25px;
    margin-bottom: 1rem;
    padding: 1rem;
}

#eye-catcher {
    img {
        object-fit: cover;
        width: 100%;
        max-height: 384px;
        border-radius: 25px;
        padding: 0;
    }

    div {
        overflow-y: auto;
        max-height: 384px;
    }

    div::-webkit-scrollbar {
        display: none;
    }
}

#details li,
#services li {
    margin-bottom: 1rem;

    span {
        background-color: white;
        padding: 0.5rem 1rem;
        border-radius: 25px;
    }
}

#map-div {
    width: 100%;
    height: 300px;
    border-radius: 25px;
}
</style>
