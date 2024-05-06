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
            <div class="d-flex gap-3 align-items-center justify-content-between">
                <div class="search w-100">
                    <input type="text" class="form-control " id="address" name="address" :value="modelValue" @input="handleInput" placeholder="Cerca...">                      
                
                    <router-link :to="{ name: 'filter' }">
                        <button class="btn" @click="$emit('submitForm')"><i class="fas fa-search fa-xl"></i></button>
                    </router-link>
                </div>
                
                <div class="distance">
                    <div class="d-flex w-100">
                        <div class="w-100"><i class="fa-solid fa-location-dot color-blue"></i> Max {{ distanceRadius }} km</div>
                        <input type="range" class="form-range" id="radius" name="radius" min="5" max="30" step="5"
                            :value="distanceRadius" @input="handleInputDistance">
                    </div>
                </div>
            </div>



            <ul id="suggestions-list" class="p-2 mt-3 bg-light rounded" v-show="suggestions.length > 0">
                <li v-for="suggestion in suggestions" :key="suggestion.lat + suggestion.lon"
                    @click="$emit('selectAddress', suggestion, selectedAddress)" class="pointer">
                    <i class="fa-solid fa-location-dot color-blue"></i> {{ suggestion.address }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang='scss' scoped>
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
</style>