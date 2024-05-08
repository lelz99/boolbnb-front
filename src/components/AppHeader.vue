<script>

export default {
    name: 'AppHeader'
}
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container d-flex justify-content-between">
            <div class="d-flex align-items-center">
                <a class="navbar-brand" href="#">
                    <img src="../../public/Boolbnb-logo-nobg.png" alt="Boolbnb logo" class="nav-logo">
                </a>
                <router-link class="nav-link" :to="{ name: 'home' }">Home</router-link>
            </div>
            <router-link class="nav-link" :to="{ name: '' }"><i class="fa-regular fa-user"></i></router-link>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
nav {
    height: 70px;
    position: sticky;
    width: 100%;
    top: 0;
    z-index: 1;

    .navbar-toggler {
        z-index: 2;
    }

    .nav-logo {
        height: 50px;
    }
}
</style>
