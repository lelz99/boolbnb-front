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
            <div class="d-flex gap-3 align-items-center">
                <div class="input-group">
                    <input type="text" class="form-control " id="address" name="address" :value="modelValue" @input="handleInput" placeholder="Cerca...">                      
                
                    <router-link :to="{ name: 'filter' }" class="input-group-text">
                        <button class="btn text-primary" @click="$emit('submitForm')"><i class="fas fa-search fa-xl"></i></button>
                    </router-link>
                </div>
                
                <div class="text-light">
                    <label for="radius" class="w-100 text-center">Distanza</label>
                    <input type="range" class="form-range" id="radius" name="radius" min="5" max="30" step="5"
                        :value="distanceRadius" @input="handleInputDistance">
                    <div class="w-100 text-center">{{ distanceRadius }} km</div>
                </div>
            </div>



            <ul id="suggestions-list" class="p-2 mt-3 bg-light rounded text-white" v-show="suggestions.length > 0">
                <li v-for="suggestion in suggestions" :key="suggestion.lat + suggestion.lon"
                    @click="$emit('selectAddress', suggestion, selectedAddress)" class="pointer">
                    <i class="fa-solid fa-location-dot text-primary"></i> {{ suggestion.address }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang='scss' scoped>

</style>