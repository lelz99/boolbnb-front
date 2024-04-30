<script>
import { computed } from 'vue';

export default {
    name: 'ApartmentCard',
    props: { apartment: Object },
    methods: {
        handleMouseOver(event) {
            const target = event.currentTarget;
            const targetRect = target.getBoundingClientRect();
            const mouseX = event.clientX - targetRect.left;
            const halfway = target.clientWidth / 2;
            const shouldScrollRight = mouseX > halfway;

            if (shouldScrollRight) {
                target.scrollLeft += 10;
            } else {
                target.scrollLeft -= 10;
            }

            // Continua lo scrolling finché il mouse è sopra l'elemento
            const scroll = () => {
                if (mouseX > halfway && target.scrollLeft < target.scrollWidth - target.clientWidth) {
                    target.scrollLeft += 1;
                    requestAnimationFrame(scroll);
                } else if (mouseX < halfway && target.scrollLeft > 0) {
                    target.scrollLeft -= 1;
                    requestAnimationFrame(scroll);
                }
            };
            scroll();
        }
    },
    computed: {
        roundedDistance() {
            return parseFloat(this.apartment.distance).toFixed(2);
        }
    }
}
</script>

<template>
    <div class="col-sm-12 col-lg-6 col-xl-3 col-xl-2 my-4">
        <div class="card card-apartment p-3">
            <figure>
                <img class="card-image card-img-top img-fluid rounded" :src="apartment.cover_image"
                    :alt="apartment.title">
            </figure>

            <div class="card-body">
                <h5 class="mt-3">{{ apartment.title }}</h5>
                <p class="mb-2">{{ apartment.address }}</p>
                <p v-show="apartment.distance" class="mb-2">{{ roundedDistance }} km</p>
                <ul class="card-services" @mouseover="handleMouseOver">
                    <li v-for="service in apartment.services" :key="service.id"><i :class="service.icon"></i></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card-apartment {
    figure {
        width: 100%;
        height: 300px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .card-services {
        display: flex;
        gap: 16px;
        overflow-x: hidden;
        /* Nasconde la scrollbar */
        white-space: nowrap;
    }

    .card-body {
        height: 200px;
        overflow-y: auto;
    }
}
</style>
