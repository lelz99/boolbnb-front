<script>
import axios from 'axios';
import ApartmentCard from '../components/apartments/ApartmentCard.vue';
import ApartmentList from '../components/apartments/ApartmentList.vue';
import AppLoader from '../components/AppLoader.vue';
import AppAlert from '../components/AppAlert.vue';
import { store } from '../data/store';
import SearchBar from '../components/SearchBar.vue';

const baseUri = 'http://localhost:8000/api/';


export default {
  name: 'HomePage',
  components: { ApartmentCard, ApartmentList, AppAlert, SearchBar },
  data() {
    return {
      apartmentsList: [],
      isLoading: false,
      isAlertOpen: false,
      apartments: [],
      addressTerm: '', // Input dell'utente
      suggestions: [], // Array per memorizzare gli indirizzi suggeriti
      selectedAddress: {}, // Indirizzo selezionato
      latitude: '', // Latitudine selezionata
      longitude: '', // Longitudine selezionata
      distanceRadius: '20', // Imposta un valore predefinito per il raggio di distanza (20 km)
      timeout: null, // Timeout per ritardare le richieste
    }
  },
  methods: {
    suggestAddresses() {
      if (!this.addressTerm.trim()) {
        this.suggestions = [];
        return;
      }

      // Se c'è già una richiesta in corso, annulla il timeout
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      // Avvia un timeout per ritardare l'esecuzione della richiesta
      this.timeout = setTimeout(() => {
        axios.get('https://api.tomtom.com/search/2/geocode/' + this.addressTerm.trim() + '.json', {
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
      }, 500); // Ritardo di 500 millisecondi tra le richieste
    },

    selectAddress(address) {
      this.selectedAddress = address;
      this.latitude = address.lat; // Aggiorna la latitudine nel dato Vue.js
      this.longitude = address.lon; // Aggiorna la longitudine nel dato Vue.js
      this.addressTerm = address.address; // Compila l'input dell'indirizzo con l'indirizzo selezionato
      this.suggestions = [];
    },

    submitForm() {
      // Effettua una chiamata API al tuo endpoint Laravel
      axios.get(`http://localhost:8000/api/apartments/search`, {
        params: {
          latitude: this.latitude,
          longitude: this.longitude,
          radius: this.distanceRadius,
        }
      })
        .then(response => {
          this.apartments = response.data;
          store.apartments = this.apartments;
          store.distanceRadius = this.distanceRadius;
          // console.log(this.apartments);
          console.log(store.apartments);
        })
        .catch(error => {
          console.error('Errore durante il recupero degli appartamenti:', error);
        });
    },

    fetchApartments() {
      this.isLoading = true;
      axios.get(baseUri + 'apartments/')
        .then(res => {
          this.apartmentsList = res.data;
          this.isAlertOpen = false;
        })
        .catch(err => {
          console.error(err);
          this.isAlertOpen = true;
        }).then(() => {
          this.isLoading = false;
        })
    }
  },

  created() {
    this.fetchApartments()
  }
}
</script>

<template>
  <div class="col-12">
    <!-- Ricerca -->
    <SearchBar @selectAddress="selectAddress" @suggest="suggestAddresses" :suggestions='suggestions'
      v-model="addressTerm" v-model:distanceRadius="distanceRadius" :selectedAddress="selectedAddress"
      @submitForm="submitForm" />
  </div>
  <AppAlert :show="isAlertOpen" @close="isAlertOpen = false" />
  <AppLoader v-if="isLoading" />
  <ApartmentList v-else :apartments="apartmentsList" />
</template>