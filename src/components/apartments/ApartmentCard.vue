<script>
export default {
    name: 'ApartmentCard',
    props: { apartment: Object }
}
</script>
<template>
   
    <div class="card-apartment col-sm-12 col-lg-6 col-xl-3 col-xl-2 my-4">
        <img class="card-image img-fluid rounded" :src="apartment.cover_image" :alt="apartment.title">
        <h5 class="mt-3">{{ apartment.title }}</h5>
        <p class="mb-2">{{ apartment.address }}</p>
        <ul class="card-services">
            <li v-for="service in apartment.services"><i :class="service.icon"></i></li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>

.card-apartment{
    

    .card-services {
    display: flex;
    gap: 16px;
    overflow-x: auto; 
    white-space: nowrap;
}
}



</style>
