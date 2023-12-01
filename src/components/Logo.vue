<script setup>
const props = defineProps({
    name: String
})

const src = `./../../src/assets/logos/${props.name}.svg`;
// @todo build compile, remove src/assets.. from neuron/public in other project
</script>
<template>
    <img v-if="name !== undefined && name !== 'proxy'"
         :src="src"
    />
</template>