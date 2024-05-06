<script>
import ApartmentCard from './ApartmentCard.vue';

export default {
    name: 'ApartmentList',
    components: {ApartmentCard},
    props: { apartments: Array, pages: Array },
    emits:['change-page']
}
</script>
<template>
    <section id="apartments-list">
        <div v-if="apartments.length" class="row mb-5 mt-3 g-3">
            <ApartmentCard v-for="apartment in apartments" :key="apartment.id" :apartment="apartment"/>
            <div class="d-flex justify-content-center">
                <a class="btn-back-top" href="#">
                    <svg height="1.2em" class="arrow" viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path></svg>
                    <p class="text">Torna su</p>
                </a>
            </div>

          <!-- Paginazione -->
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li v-for="page in pages" :key="page.label" class="page-item" :class="{'active': page.active, 'disabled': !page.url}">
                <button class="page-link" v-html="page.label" :disabled="!page.url" @click="$emit('change-page', page.url)"></button>
              </li>             
            </ul>
          </nav>
        </div>
        <h3 v-else class="mt-4">Non ci sono appartamenti</h3>
    </section>
</template>

<style lang="scss" scoped>
.btn-back-top {
  width: 45px;
  height: 45px;
  background-color: #4e99e9;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  border: none;
  margin-top: 30px;
}

.arrow path {
  fill: white;
}

.text {
  font-size: 0.7em;
  width: 100px;
  position: absolute;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: -18px;
  opacity: 0;
  transition-duration: .7s;
}

.btn-back-top:hover .text {
  opacity: 1;
  transition-duration: .7s;
}

.btn-back-top:hover .arrow {
  animation: slide-in-bottom .7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes slide-in-bottom {
  0% {
    transform: translateY(10px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

</style>