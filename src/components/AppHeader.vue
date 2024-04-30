<script>

export default {
    name: 'AppHeader'
}
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><img src="/Boolbnb-logo-nobg.png" alt="Boolbnb logo" class="nav-logo"></a>


            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'home' }">Home</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
nav{
    height: 70px;
    
    .nav-logo{
        height: 50px;
    }
}

</style>

