<script>

export default {
    name: 'AppHeader'
}
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
            <a class="navbar-brand" href="#"><img src="/boolbnb-logo-nobg.png" alt="Boolbnb logo" class="nav-logo"></a>


            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                <ul class="navbar-nav d-flex ">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'home' }">Home</router-link>
                    </li>
                </ul>
                <router-link class="nav-link" :to="{ name: '' }"><i class="fa-regular fa-user"></i></router-link>
            </div>
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
