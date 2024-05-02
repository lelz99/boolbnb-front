<script>
import { store } from '../../data/store';

export default {
    name: 'ShowCard',
    props: { apartment: Object },
    // data: () => ({
    //     store,
    // }),
};
</script>

<template>
    <div class="container" id="show">
        <header class="mt-3">
            <h1 class="text-center m-0">{{ apartment.title }}</h1>
        </header>
        <!-- immagine -->
        <section id="eye-catcher" class="pb-3">
            <div class="mb-3 row justify-content-center">
                <div class="row justify-content-center img-container col-lg-8 overflow-hidden">
                    <img :src="apartment.img" :alt="apartment.title">
                </div>
                <!-- descrizione a comparsa in large -->
                <div id="description" class="d-none d-lg-block col-lg-4 pt-1 ps-4">
                    <h3 class="text-center pb-1 mb-2 bottom-border">Descrizione</h3>
                    <p class="m-0">{{ apartment.description }}</p>
                </div>
            </div>
            <!-- bottone indietro -->
            <div class="d-flex justify-content-evenly pb-3">
                <button @click="$router.back()" class="btn btn-secondary btn-sm"><i
                        class="fas fa-arrow-left me-2 d-none d-sm-inline"></i>Indietro</button>
                <!-- bottone invia messaggio -->
                <a href="#" class="btn btn-primary btn-sm">
                    <i class="fas fa-comments me-2 d-none d-sm-inline"></i>
                    Contattal'host</a>
            </div>
            <div class="row justify-content-center text-center flex-column">
                <p class="m-0">{{ apartment.address }}</p>
                <p class="m-0"><a href="#apartment-map">Trova su mappa <i class="fa-solid fa-chevron-down"></i></a></p>
            </div>
        </section>
        <!-- proprietà -->
        <section id="details" class="pb-3 details-img">
            <h3 class="text-center pb-1 mb-3 bottom-border">Dettagli</h3>
            <ul class="row m-0 row-cols-1 row-cols-sm-2 row-cols-xl-4 list-unstyled">
                <li><span><i class="fa-solid fa-ruler-combined me-2 brand-color"></i> Metri quadri:
                        {{ apartment.square_meters }}</span></li>
                <li><span><i class="fa-solid fa-door-closed me-2 brand-color"></i> Numero stanze:
                        {{ apartment.rooms }}</span></li>
                <li><span><i class="fa-solid fa-bed me-2 brand-color"></i> Camere da letto: {{ apartment.beds }}
                    </span></li>
                <li><span><i class="fa-solid fa-bath me-2 brand-color"></i> Numero bagni: {{ apartment.baths }}
                    </span></li>
            </ul>
        </section>
        <!-- servizi -->
        <section id="services" class="pb-3">
            <h3 class="text-center pb-1 mb-3 bottom-border">Servizi</h3>
            <ul class="row m-0 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 list-unstyled">

                <li v-for="service in  apartment.services "><span><i :class="`${service.icon} me-2 brand-color`"></i>
                        {{ service.label }}</span></li>
            </ul>
        </section>
        <!-- descrizione -->
        <section id="description" class="pb-3 d-lg-none">
            <h3 class="text-center pb-1 mb-3 bottom-border">Descrizione</h3>
            <p class="m-0">{{ apartment.description }}</p>
        </section>
        <!-- mappa -->
        <section id="apartment-map" class="pb-3">
            <h3 class="text-center pb-1 mb-3 bottom-border">Dove sarai</h3>
            <div id="map-div"></div>
        </section>
    </div>
    <!-- coordinate NASCOSTE per recupero in js -->
    <div class="d-none">
        <p id="latitude-aprtmnt">{{ apartment.latitude }}</p>
        <p id="longitude-aprtmnt">{{ apartment.longitude }}</p>
    </div>
</template>

<style lang="scss"></style>