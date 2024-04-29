import { reactive } from "vue";

export const store = reactive({
    apartmentsList: [],
    apartments: [],
    baseUri: 'http://localhost:8000/api/',
    isLoading: false,
    isAlertOpen: false,
    addressTerm: '',
    latitude: '', // Latitudine selezionata
    longitude: '', // Longitudine selezionata
    distanceRadius: 20,
    address: ''

})