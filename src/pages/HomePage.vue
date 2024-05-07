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
      sponsoredApartments: [], // Appartamenti sponsorizzati
      otherApartments: [], // Altri appartamenti
      apartmentsPage: [], //array per i link delle pagine della paginazione
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
      showVideo: true, // Mostra il video di sfondo all'inizio
      showContent: false // Aggiunto per gestire la transizione del contenuto
    };
    
  },
  methods: {
    suggestAddresses() {
      if (!this.addressTerm.trim()) {
        this.suggestions = [];
        return;
      }

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

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
      }, 500);
    },

    selectAddress(address) {
      store.selectedAddress = address;
      store.latitude = address.lat;
      store.longitude = address.lon;
      this.addressTerm = address.address;
      store.addressTerm = address.address;
      this.suggestions = [];
    },

    submitForm() {
      axios.get(`http://localhost:8000/api/apartments/search`, {
        params: {
          latitude: store.latitude,
          longitude: store.longitude,
          radius: this.distanceRadius,
          beds: store.beds,
          rooms: store.rooms,
        }
      })
        .then(response => {
          this.apartments = response.data;
          store.apartments = this.apartments;
          store.distanceRadius = this.distanceRadius;
        })
        .catch(error => {
          console.error('Errore durante il recupero degli appartamenti:', error);
        });
    },

    fetchApartments(endpoint) { //gli passo l'url della pagina a cui deve andare (paginazione)
    console.log('Endpoint:', endpoint);
      if(!endpoint) endpoint = baseUri + 'apartments/'; //se non c'è un endpoint diverso da quello della prima pagina, viene caricata la prima pagina
      this.isLoading = true;
      axios.get(endpoint) //aggiorno con il nuovo endpoint
        .then(res => {
          this.apartmentsList = res.data.data; //recupero i dati dell'appartamento
          this.apartmentsPage = res.data.links; //recupero i link delle pagine per la paginazione
          this.isAlertOpen = false;
          // Separo gli appartamenti sponsorizzati dagli altri appartamenti
          this.sponsoredApartments = this.apartmentsList.filter(apartment => apartment.sponsored);
          this.otherApartments = this.apartmentsList.filter(apartment => !apartment.sponsored);
      })
        .catch(err => {
          console.error(err);
          this.isAlertOpen = true;
        }).then(() => {
          this.isLoading = false;
        });
    }
  },
  created() {
    this.fetchApartments();
    setTimeout(() => {
      this.showVideo = false;
      setTimeout(() => {
        this.showContent = true;
      }, 500);
    }, 4800);
  }
}
</script>

<template>
  <div>
    <div class="video-background" v-if="showVideo">
      <video autoplay muted loop id="video-background">
        <source src="/background-video.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>

    <div v-else>
      <div class="page-content" :class="{ 'show-content': showContent }">
        <div class="col-12">
          <!-- Ricerca -->
          <SearchBar @selectAddress="selectAddress" @suggest="suggestAddresses" :suggestions='suggestions'
            v-model="addressTerm" v-model:distanceRadius="distanceRadius" :selectedAddress="selectedAddress"
            @submitForm="submitForm" />
        </div>
        <AppAlert :show="isAlertOpen" @close="isAlertOpen = false" />
        <AppLoader v-if="isLoading" />
        
        <!-- Applica l'effetto di comparizione alle carte -->
        <ApartmentList :sponsored-apartments="sponsoredApartments" :other-apartments="otherApartments"  :pages="apartmentsPage" @change-page="fetchApartments" class="appearance-effect" />       
      </div>
      <div class="background-image"></div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.video-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 1;
}

#video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.page-content {
  opacity: 0;
  transition: opacity 0.5s ease;

  &.show-content {
    opacity: 1;
  }
}

.appearance-effect {
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

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
</style>







<!-- <script>
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
      showVideo: true, // Mostra il video di sfondo all'inizio
      showContent: false // Aggiunto per gestire la transizione del contenuto
    };
  },
  methods: {
    suggestAddresses() {
      if (!this.addressTerm.trim()) {
        this.suggestions = [];
        return;
      }

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

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
      }, 500);
    },

    selectAddress(address) {
      store.selectedAddress = address;
      store.latitude = address.lat;
      store.longitude = address.lon;
      this.addressTerm = address.address;
      store.addressTerm = address.address;
      this.suggestions = [];
    },

    submitForm() {
      axios.get(`http://localhost:8000/api/apartments/search`, {
        params: {
          latitude: store.latitude,
          longitude: store.longitude,
          radius: this.distanceRadius,
          beds: store.beds,
          rooms: store.rooms,
        }
      })
        .then(response => {
          this.apartments = response.data;
          store.apartments = this.apartments;
          store.distanceRadius = this.distanceRadius;
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
        });
    }
  },
  created() {
    this.fetchApartments();
    setTimeout(() => {
      this.showVideo = false;
      setTimeout(() => {
        this.showContent = true;
      }, 500);
    }, 4800);
  }
}
</script> -->

<!-- <template>
  <div>
    <div class="video-background" v-if="showVideo">
      <video autoplay muted loop id="video-background">
        <source src="/background-video.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>

    <div v-else>
      <div class="page-content" :class="{ 'show-content': showContent }">
        <div class="col-12"> -->
          <!-- Ricerca -->
          <!-- <SearchBar @selectAddress="selectAddress" @suggest="suggestAddresses" :suggestions='suggestions'
            v-model="addressTerm" v-model:distanceRadius="distanceRadius" :selectedAddress="selectedAddress"
            @submitForm="submitForm" />
        </div>
        <AppAlert :show="isAlertOpen" @close="isAlertOpen = false" />
        <AppLoader v-if="isLoading" /> -->
        
        <!-- Applica l'effetto di comparizione alle carte -->
        <!-- <ApartmentList v-else :apartments="apartmentsList" class="appearance-effect" />
      </div>
      <div class="background-image"></div>
    </div>
  </div>
</template> -->

<!-- <style lang='scss' scoped>
.video-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 1;
}

#video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.page-content {
  opacity: 0;
  transition: opacity 0.5s ease;

  &.show-content {
    opacity: 1;
  }
}

.appearance-effect {
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

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
</style> -->