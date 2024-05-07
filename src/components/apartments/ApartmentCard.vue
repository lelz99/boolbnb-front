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
    <div class="col-sm-12 col-lg-6 col-xl-3 col-xl-2">
        <RouterLink :to="`/apartments/${apartment.slug}`">
            <!-- <RouterLink :to="{name: 'show', params:{slug: apartment.slug}}"> -->
            <div class="card card-apartment">
                <figure class="p-1">
                    <img class="card-image card-img-top img-fluid rounded" :src="apartment.cover_image"
                        :alt="apartment.title">
                    <span v-if="apartment.sponsored" class="badge badge-gold">IN EVIDENZA <i
                            class="fa-solid fa-crown"></i></span>
                </figure>
                <div class="card-body">
                    <h5 class="card-title">{{ apartment.title }}</h5>
                    <div class="d-flex gap-3">
                        <p class="mb-2"><i class="fa-solid fa-location-dot"></i> {{ apartment.address }}</p>
                        <p v-show="apartment.distance" class="mb-2">{{ roundedDistance }} km</p>
                    </div>
                    <hr>
                    <ul class="d-flex gap-3">
                        <li><i class="fa-solid fa-door-closed"></i> Stanze {{ apartment.rooms }} </li>
                        <li><i class="fa-solid fa-bed"></i> Letti {{ apartment.beds }}</li>
                    </ul>
                    <ul class="card-services" @mouseover="handleMouseOver">
                        <li v-for="service in apartment.services" :key="service.id"><i :class="service.icon" class="color-blue"></i></li>
                    </ul>
                   
                </div>
            </div>
        </RouterLink>
    </div>
</template>

<style lang="scss" scoped>
.apartment-card {
    position: relative;
    display: inline-block;
}

a {
    text-decoration: none;
}

.apartment-image {
    width: 100%;
    height: auto;
}

.badge {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px 10px;
    background-color: red;
    color: white;
    border-radius: 5px;
    font-size: 12px;
}

.card-apartment {
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s ease;

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
        padding-top: 0;
        // overflow-y: auto;
        overflow-y: hidden; // Nasconde la scrollbar verticale

        .card-title{
            min-height: 50px;
        }
    }
}

.badge-gold{
    background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
    color: rgb(121, 103, 3);

}


// Effetto hover d-md
@media (min-width: 768px) {

    // d-md
    .card-apartment:hover {
        transform: scale(1.05);
        cursor: pointer;
    }
}
</style>
