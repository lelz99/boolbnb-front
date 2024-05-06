<script>
import axios from 'axios';
import { store } from '../data/store';
import AppLoader from '../components/AppLoader.vue';
import AppAlert from '../components/AppAlert.vue';
import MessageFormAlert from '../components/MessageFormAlert.vue';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
// import mapMarker from '../data/map-marker';

const API_KEY = '82X2Cl2U4NDmOxA8fgnGKju65G1vKsqh';
const messageEndpoint = 'http://localhost:8000/api/messages/';
const defaultForm = { name: '', surname: '', email: '', text: '' };

export default {
    name: 'ShowPage',
    components: { AppLoader, AppAlert, MessageFormAlert },
    data: () => ({
        store,
        apartment: null,
        form: defaultForm,
        successMessage: null,
        // showSuccessAlert: false, 
        errors: {},
        isPristine: true


    }),
    computed: {
        hasError() {
            return Object.keys(this.errors).length
        },

        showAlert() {
            return Boolean(this.successMessage || this.hasError)
        },

        alertType() {
            return this.hasError ? 'danger' : 'success'
        }
    },
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

        validateField(field) {
            if (this.isPristine) return '';
            return this.errors[field] ? 'is-invalid' : 'is valid';
        },

        validateForm() {

            this.errors = {};
            this.successMessage = null;
            //Validazione mail
            if (!this.form.email) {
                this.errors.email = 'La mail è obbligatoria'
            } else if (!this.form.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                this.errors.email = 'La mail inserita non è valida'
            }

            //validazione messaggio

            if (!this.form.text) this.errors.text = 'Il testo è obbligatorio'

        },

        sendForm() {
            this.isPristine = false;

            // Validazione
            this.validateForm();

            if (this.hasError) return;

            store.isLoading = true;
            this.form.apartment_id = this.apartment.id;
            axios.post(messageEndpoint, JSON.stringify(this.form), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {
                    this.isPristine = true;
                    // this.form = { ...defaultForm };
                    // Svuoto i campi degli input
                    this.form.name = '';
                    this.form.surname = '';
                    this.form.email = '';
                    this.form.text = '';
                    this.successMessage = "Messaggio inviato con successo!";
                })
                .catch(err => {
                    console.error(err);
                    this.successMessage = "Si è verificato un errore durante l'invio del messaggio.";
                    if (err.response.status === 400) {
                        const { errors } = err.response.data
                        this.errors = { ...errors }
                    } else {
                        this.errors = { network: 'Si è verificato un errore' }
                    }

                })
                .finally(() => {
                    store.isLoading = false;
                    this.getApartment();
                });
        },
        closeAlert() {
            this.successMessage = null;
            this.errors = {}
        }
    },
    created() {
        this.getApartment();
    }
}
</script>


<template>
    <AppLoader v-if="store.isLoading" />

    <div v-else-if="!store.isLoading && apartment" id="show">

        <header class="d-flex justify-content-between my-3">
            <RouterLink :to="{ name: 'home' }"><i class="fa-solid fa-chevron-left"></i> Indietro
            </RouterLink>
            <a href="#message-area">
                Contatta l'host <i class="fa-solid fa-chevron-down"></i></a>
        </header>

        <!--* Img + Indirizzo -->
        <section id="eye-catcher">
            <!-- immagine -->
            <div class="row justify-content-center">
                <div class="row justify-content-center img-container col-lg-8 overflow-hidden mb-3 rounded">
                    <img :src="apartment.cover_image" :alt="apartment.title">
                </div>
                <!--# descrizione a comparsa in large -->
                <div id="description" class="d-none d-lg-block col-lg-4 pt-1 ps-4">
                    <h3 class="mb-2 ">Descrizione</h3>
                    <p>{{ apartment.description }}</p>
                </div>
            </div>
            <!-- Titolo appartamento -->
            <h1 class="text-center">{{ apartment.title }}</h1>
            <!-- Indirizzo appartamento -->
            <div class="row justify-content-center text-center flex-column">
                <em>{{ apartment.address }}</em>
                <p>
                    <a href="#apartment-map">Trova sulla mappa</a>
                </p>
            </div>
        </section>
        <!--* proprietà -->
        <section id="details" class=" details-img">
            <h3>Dettagli Appartamento</h3>
            <ul class="row row-cols-1 row-cols-sm-2 row-cols-xl-4 list-unstyled">
                <li><span><i class="fa-solid fa-ruler-combined"></i> Metri quadri:
                        {{ apartment.square_meters }}</span></li>
                <li><span><i class="fa-solid fa-door-closed"></i> Numero stanze:
                        {{ apartment.rooms }}</span></li>
                <li><span><i class="fa-solid fa-bed"></i> Camere da letto: {{ apartment.beds }}
                    </span></li>
                <li><span><i class="fa-solid fa-bath"></i> Numero bagni: {{ apartment.baths }}
                    </span></li>
            </ul>
        </section>
        <!--* servizi -->
        <section id="services">
            <h3>Cosa Troverai</h3>
            <ul class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 list-unstyled">

                <li v-for="service in apartment.services "><span><i :class="`${service.icon}`"></i>
                        {{ service.label }}</span></li>
            </ul>
        </section>
        <!--* descrizione -->
        <section id="description" class=" d-lg-none">
            <h3>Descrizione</h3>
            <p>{{ apartment.description }}</p>
        </section>
        <!--* mappa -->
        <section id="apartment-map">
            <h3>Dove sarai</h3>
            <div id="map-div"></div>
        </section>
        <!--* invia messaggio -->
        <section id="message-area">

            <!--! Alert -->
            <!-- <MessageFormAlert :isOpen="showAlert" @close="closeAlert" :type="alertType" :dismissible="!hasError">
                <div v-if="successMessage">{{ successMessage }}
                    <ul v-if="hasError">
                        <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
                    </ul>
                </div>
            </MessageFormAlert> -->
            <MessageFormAlert :isOpen="showAlert" @close="closeAlert" :type="alertType" :dismissible="!hasError">
                <ul v-if="hasError">
                    <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
                </ul>
                <div v-else>
                    <span>{{ successMessage }}</span>
                </div>
            </MessageFormAlert>

            <!-- Form invio messaggi -->
            <form @submit.prevent="sendForm" enctype="multipart/form-data" novalidate>
                <h3>Contatta l'host</h3>
                <!-- Nome -->
                <div class="mb-3">
                    <label for="name" class="form-label">Nome</label>
                    <input type="text" class="form-control" name="name" id="name" placeholder="Es: Mario"
                        v-model.trim="form.name">
                </div>
                <!-- Cognome -->
                <div class="mb-3">
                    <label for="surname" class="form-label">Cognome</label>
                    <input type="text" class="form-control" name="surname" id="surname" placeholder="Es: Rossi"
                        v-model.trim="form.surname">
                    <div v-if="errors.surname" class="invalid-feedback">{{ errors.surname }}</div>
                </div>
                <!-- Email -->
                <div class="mb-3">
                    <label for="email" class="form-label">Indirizzo Mail<sup class="text-danger">*</sup></label>
                    <input type="email" class="form-control" :class="validateField('email')" name="email" id="email"
                        placeholder="Es: email@esempio.com" v-model.trim="form.email" required>
                    <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
                    <small v-else class="form-text text-muted">Ti ricontatteremo a questo indirizzo</small>
                </div>
                <!-- Textarea -->
                <div class="mb-3">
                    <label for="text" class="form-label">Corpo del messaggio<sup class="text-danger">*</sup></label>
                    <textarea class="form-control" :class="validateField('text')" name="text" id="text" rows="3"
                        v-model.trim="form.text" required></textarea>
                    <div v-if="errors.text" class="invalid-feedback">{{ errors.text }}</div>
                </div>
                <!-- Invia -->
                <button class="btn btn-primary" type="submit">Invia Messaggio</button>
            </form>
        </section>

    </div>
</template>

<style lang="scss" scoped>
/*reset*/
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

/*styling elements*/

#map-div {
    width: 100%;
    height: 300px;
    border-radius: 25px;
}

h3 {
    margin-bottom: 1rem;
    text-align: center;
    padding-bottom: 4px;
    border-bottom: 1px #172BA1 solid;
}

section {
    padding-bottom: 1rem;
}

ul li i {
    margin-right: 8px;
}

a {
    color: black;
    text-decoration: none;
}
</style>
