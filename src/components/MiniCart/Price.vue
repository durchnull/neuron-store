<script setup>
import {computed} from "vue";

const {amount} = defineProps({
    amount: Number
})

const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
});

const priceFormatted = computed(() => {
    return formatter.format(amount / 100)
})
</script>
<template>
    <span>{{ priceFormatted }}</span>
</template>