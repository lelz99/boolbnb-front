<script>
export default {
    name: 'ApartmentCard',
    props: { apartment: Object }
}
</script>
<template>
    <div class="card-apartment">
        <img class="card-image" :src="apartment.cover_image" :alt="apartment.title">
        <h4>{{ apartment.title }}</h4>
        <p>{{ apartment.address }}</p>
        <ul class="card-services">
            <li v-for="service in apartment.services"><i :class="service.icon"></i></li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>

.card-services {
    display: flex;
    gap: 16px;
}
</style>
