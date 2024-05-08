<script>
import axios from 'axios';
import ApartmentCard from '../components/apartments/ApartmentCard.vue';
import ApartmentList from '../components/apartments/ApartmentList.vue';
import AppLoader from '../components/AppLoader.vue';
import AppAlert from '../components/AppAlert.vue';
import { store } from '../data/store';

export default {
    name: 'FilteredPage',
    components: { ApartmentCard, ApartmentList, AppAlert },
    data() {
        return {
            store,
            suggestions: [], // Array per memorizzare gli indirizzi suggeriti
            timeout: null, // Timeout per ritardare le richieste
            addressSelected: false, // Flag per tenere traccia dello stato di selezione dell'indirizzo
            addressError: false, // Flag per indicare se c'è un errore nell'indirizzo inserito
            services: [],
            filterService: [],
        }
    },
    methods: {
        suggestAddresses() {
            if (!store.addressTerm.trim()) {
                store.suggestions = [];
                return;
            }

            // Se c'è già una richiesta in corso, annulla il timeout
            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            // Avvia un timeout per ritardare l'esecuzione della richiesta
            this.timeout = setTimeout(() => {
                axios.get('https://api.tomtom.com/search/2/geocode/' + store.addressTerm.trim() + '.json', {
                    params: {
                        key: 'vDGqRtusGtGdJKA6KXnnnRPK44NG2Uwn',
                        limit: 5,
                        language: 'it-IT',
                        countrySet: 'IT'
                    }
                })
                    .then(response => {
                        this.suggestions = response.data.results.map(result => ({
                            address: result.address.freeformAddress,
                            lat: result.position.lat,
                            lon: result.position.lon
                        }));
                    })
                    .catch(error => {
                        console.error(error);
                        this.suggestions = [];
                    });
            }, 500);
        },

        selectAddress(address) {
            store.selectedAddress = address;
            store.latitude = address.lat;
            store.longitude = address.lon;
            store.addressTerm = address.address;
            this.suggestions = [];
            this.addressSelected = true; // Imposta il flag addressSelected su true
        },

        submitForm() {
            // Verifica se è stato selezionato un indirizzo valido
            if (!store.selectedAddress || store.selectedAddress.address !== store.addressTerm.trim()) {
                // Imposta il flag addressError su true per mostrare il messaggio di errore
                this.addressError = true;
                return; // Esce dalla funzione se l'indirizzo non corrisponde
            }
            // Azzera il flag addressError se non ci sono errori
            this.addressError = false;

            // Effettua una chiamata API al tuo endpoint Laravel
            axios.get(`http://localhost:8000/api/apartments/search`, {
                params: {
                    latitude: store.latitude,
                    longitude: store.longitude,
                    radius: store.distanceRadius,
                    services: this.filterService,
                    beds: store.beds,
                    rooms: store.rooms,
                }
            })
                .then(response => {
                    // Aggiorna lo stato degli appartamenti con i dati ricevuti dalla risposta
                    store.apartments = response.data;
                    console.log(store.apartments);
                })
                .catch(error => {
                    console.error('Errore durante il recupero degli appartamenti:', error);
                });
        },

        fetchApartments() {
            store.isLoading = true;
            axios.get(store.baseUri)
                .then(res => {
                    store.apartmentsList = res.data;
                    store.isAlertOpen = false;
                })
                .catch(err => {
                    console.error(err);
                    store.isAlertOpen = true;
                }).then(() => {
                    store.isLoading = false;
                })
        },
        fetchServices() {
            axios.get('http://localhost:8000/api/services/')
                .then(res => { this.services = res.data })
        },
    },
    computed: {

    },
    created() {
        // if (store.apartments) {
        //     this.submitForm();
        // } else {
        //     this.fetchApartments();
        // }
        this.fetchApartments();
        console.log(store.apartments);

        this.fetchServices()
    },
    // mounted() {
    //     store.apartments = [];
    // }
}

</script>

<template>

    <h1 class="text-light">Ricerca avanzata</h1>
    <div class="row mb-4">

        <div class="col-12">
            <div class="mb-3 ">
                <div class="d-flex gap-3 align-items-center justify-content-between">
                    <div class="search w-100">
                        <input type="text" class="form-control" id="address" name="address" v-model="store.addressTerm"
                            @input="suggestAddresses">
                        <router-link :to="{ name: 'filter' }">
                            <button class="btn" @click="submitForm"><i
                                    class="fas fa-search fa-xl"></i></button>
                        </router-link>
                    </div>
                    <div class="distance">
                        <div class="d-flex w-100">
                            <div class="w-100"><i class="fa-solid fa-location-dot color-blue"></i> Max {{ store.distanceRadius }} km</div>
                            <input type="range" class="form-range" id="radius" name="radius" min="5" max="30" step="5"
                                v-model.number="store.distanceRadius">
                        </div>
                    </div>
                </div>

                <div v-if="addressError" class="text-danger">Seleziona un indirizzo tra quelli suggeriti.</div>

                <ul id="suggestions-list" class="p-2 mt-3 bg-light rounded" v-show="suggestions.length > 0">
                    <li v-for="suggestion in suggestions" :key="suggestion.lat + suggestion.lon"
                        @click="selectAddress(suggestion)">
                        <i class="fa-solid fa-location-dot text-primary"></i> {{ suggestion.address }}
                    </li>
                </ul>
            </div>
        </div>

        <div class="col-7">
            <div class="mt-3 ms-3">
                <label class="form-label text-light">Servizi</label>
                <div class="row form-group">
                    <div v-for="service in services" :key="service.id" class="form-check form-check-inline col-3 p-0">
                        <label class="check-container d-flex ">
                            <input class="form-check-input" type="checkbox" :id="service.id" v-model="filterService"
                                :value="service.id">
                            <div class="checkmark"></div>
                            <label class="form-check-label" :for="service.id" role="button">
                                <i :class="service.icon" class="mx-2" :title="service.label"></i>
                                <span class="d-none d-md-inline">{{ service.label }}</span>
                            </label>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-3 mt-3">
            <div class="row">

                <div class="col-6">
                    <div class="mb-3">
                        <label for="beds" class="form-label text-light">Numero Letti</label>
                        <input type="number" min="1" class="form-control" id="beds" v-model="store.beds">
                    </div>
                </div>
                <div class="col-6">
                    <div class="mb-3">
                        <label for="rooms" class="form-label text-light">Numero Stanze</label>
                        <input type="number" class="form-control" id="rooms" v-model="store.rooms" min="1">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <AppAlert :show="store.isAlertOpen" @close="store.isAlertOpen = false" />
    <AppLoader v-if="store.isLoading" />
    <ApartmentList v-else :apartments="store.apartments" :sponsored-apartments="store.sponsoredApartments"/>
    <div class="background-image"></div>
</template>

<style lang='scss' scoped>
.background-image {
  background-image: url('/homepage.jpg');
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  z-index: -1;
  filter: contrast(60%);

}

.search {
  display: inline-block;
  position: relative;
}

.search input[type="text"] {
  padding: 10px;
  border: none;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.search .btn {
  background-color: #4e99e9;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  right: 0;
  transition: .9s ease;
}

.search .btn:hover {
  transform: scale(1.1);
  color: rgb(255, 255, 255);
  background-color: blue;
}

.distance{
    width: 400px;
    background-color: #fff;
    color: grey;
    padding: 10px;
    border: none;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group{
    background-color: #fff;
    color: grey;
    padding: 10px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

//* FORM CHECKBOX

/* Hide the default checkbox */
.check-container input {
    display: none;
}

.check-container {
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 15px;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
}

/* Create a custom checkbox */
.checkmark {
    position: relative;
    top: 0;
    left: 0;
    height: 1.2em;
    width: 1.2em;
    background-color: #2196F300;
    border-radius: 0.25em;
    transition: all 0.25s;
}

/* When the checkbox is checked, add a blue background */
.check-container input:checked~.checkmark {
    background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    transform: rotate(0deg);
    border: 0.1em solid grey;
    left: 0;
    top: 0;
    width: 1.05em;
    height: 1.05em;
    border-radius: 0.25em;
    transition: all 0.25s, border-width 0.1s;
}

/* Show the checkmark when checked */
.check-container input:checked~.checkmark:after {
    left: 0.46em;
    top: 0.25em;
    width: 0.3em;
    height: 0.5em;
    border-color: #fff0 white white #fff0;
    border-width: 0 0.15em 0.15em 0;
    border-radius: 0em;
    transform: rotate(45deg);
}

</style>