<script>
export default {
    name: 'AppAlert',
    props: {show: Boolean},
    emits: ['close']
}
</script>

<template>
    <div v-if="show" class="alert alert-danger alert-dismissible fade show" role="alert">
        Si è verificato un errore.
        <button type="button" class="btn-close" @click="$emit('close')"></button>
    </div>
</template>

<style lang="scss" scoped></style>
