<script>
import ApartmentCard from './ApartmentCard.vue';

export default {
    name: 'ApartmentList',
    components: {ApartmentCard},
    props: { apartments: Array }
}
</script>
<template>
    <section id="apartments-list">
        <div v-if="apartments.length" class="row mb-5">
            <ApartmentCard v-for="apartment in apartments" :key="apartment.id" :apartment="apartment"/>
        </div>
        <h3 v-else class="mt-4">Non ci sono appartamenti</h3>
    </section>
</template>
