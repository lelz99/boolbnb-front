<script>
export default {
    name: 'ApartmentCard',
    props: { apartment: Object }
}
</script>
<template>
    <div class="card">
        <img :src="apartment.cover_image" :alt="apartment.title">
        <h2>{{ apartment.title }}</h2>
        <ul class="card-services" v-for="service in apartment.services">
            <li><i :class="service.icon"></i></li>
        </ul>
    </div>
</template>
