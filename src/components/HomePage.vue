<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      suggestions: [], // Array per memorizzare gli indirizzi suggeriti
      selectedAddress: {}, // Indirizzo selezionato
      addressTerm: '', // Input dell'utente
      latitude: '', // Latitudine selezionata
      longitude: '', // Longitudine selezionata
      apartments: [],
    }
  },
  methods: {
    suggestAddresses() {
      if (!this.addressTerm.trim()) {
        this.suggestions = []; // Pulisci la lista dei suggerimenti se l'input è vuoto
        return;
      }
      // Effettua la chiamata API per suggerire gli indirizzi
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
          this.suggestions = []; // Pulisci la lista dei suggerimenti in caso di errore
        });
    },
    selectAddress(address) {
      this.selectedAddress = address;
      this.latitude = address.lat; // Aggiorna la latitudine nel dato Vue.js
      this.longitude = address.lon; // Aggiorna la longitudine nel dato Vue.js
      this.addressTerm = address.address; // Compila l'input dell'indirizzo con l'indirizzo selezionato
    },
    submitForm() {
      // Effettua una chiamata API al tuo endpoint Laravel
      axios.get(`http://localhost:8000/api/apartments/search`, {
        params: {
          latitude: this.latitude,
          longitude: this.longitude
        }
      })
        .then(response => {
          this.apartments = response.data;
          console.log(this.apartments);
        })
        .catch(error => {
          console.error('Errore durante il recupero degli appartamenti:', error);
        });
    }
  }
}
</script>

<template>
  <div class="col-12">
    <div class="mb-3">
      <label for="address" class="form-label">Indirizzo<span class="text-danger">*</span></label>
      <input type="text" class="form-control" id="address" name="address" v-model="addressTerm"
        @input="suggestAddresses">
      <ul id="suggestions-list" class="p-2 mt-3 bg-light rounded" v-show="suggestions.length > 0">
        <li v-for="suggestion in suggestions" :key="suggestion.lat + suggestion.lon" @click="selectAddress(suggestion)">
          <i class="fa-solid fa-location-dot text-primary"></i> {{ suggestion.address }}
        </li>
      </ul>
    </div>
    <button class="btn btn-primary" @click="submitForm">Invia</button>
  </div>
</template>