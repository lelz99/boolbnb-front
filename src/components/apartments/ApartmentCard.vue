<script>
export default {
    name: 'ApartmentCard',
    props: { apartment: Object }
}
</script>
<template>
    <div class="col-sm-12 col-lg-6 col-xl-3 col-xl-2 my-4">
        <div class="card card-apartment p-3">
            <figure>
                <img class="card-image card-img-top img-fluid rounded" :src="apartment.cover_image" :alt="apartment.title">
            </figure>
                
                <div class="card-body">
            <h5 class="mt-3">{{ apartment.title }}</h5>
            <p class="mb-2">{{ apartment.address }}</p>
            <ul class="card-services">
                <li v-for="service in apartment.services"><i :class="service.icon"></i></li>
            </ul>
        </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
    .card-apartment {
    
        figure{
            width: 100%;
            height: 300px;
            overflow: hidden;

            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

    .card-services {
        display: flex;
        gap: 16px;
        overflow-x: auto;
        white-space: nowrap;
    }
}
</style>
