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
    </div>
</template>
