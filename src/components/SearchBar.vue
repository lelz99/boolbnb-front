<script>
export default {
    name: 'SearchBar',
    props: {
        searchTerm: String,
        suggestions: Array,
        distanceRadius: String,
        modelValue: String,
        selectedAddress: Object
    },
    emits: ['suggest', ['update:modelValue'], ['update:distanceRadius'], 'selectAddress', 'distanceRadius', 'submitForm'],
    methods: {
        handleInput(event) {
            // Emit per aggiornare il modello
            this.$emit('update:modelValue', event.target.value);

            // Emit per un altro evento
            this.$emit('suggest');
        },
        handleInputDistance(e) {
            // Emit per aggiornare il modello
            this.$emit('update:distanceRadius', e.target.value)
        }
    }

}
</script>

<template>
    <div class="col-12">
        <div class="mb-3">
            <label for="address" class="form-label">Cerca appartamenti</label>
            <div class="d-flex gap-3">
                <input type="text" class="form-control" id="address" name="address" :value="modelValue"
                    @input="handleInput">
                <div>
                    <input type="range" class="form-range" id="radius" name="radius" min="20" max="60" step="10"
                        :value="distanceRadius" @input="handleInputDistance">
                    <span>{{ distanceRadius }} km</span>
                </div>
                <button class="btn btn-primary" @click="$emit('submitForm')"><i class="fas fa-search"></i></button>
                <router-link :to="{ name: 'filter' }">
                </router-link>
            </div>



            <ul id="suggestions-list" class="p-2 mt-3 bg-light rounded" v-show="suggestions.length > 0">
                <li v-for="suggestion in suggestions" :key="suggestion.lat + suggestion.lon"
                    @click="$emit('selectAddress', suggestion, selectedAddress)">
                    <i class="fa-solid fa-location-dot text-primary"></i> {{ suggestion.address }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style></style>