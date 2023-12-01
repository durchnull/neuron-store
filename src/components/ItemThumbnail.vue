<script setup>
defineProps({
    url: String,
    quantity: Number
})
</script>
<template>
    <div class="relative">
        <img :src="url"
             class="w-12 h-12 border rounded p-1 bg-gray-100"
        >
        <span v-if="quantity > 1"
              class="absolute top-0 right-0 flex justify-center items-center p-1 w-6 h-6 transform translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 text-gray-600 rounded-full text-xs font-bold"
        >{{ quantity }}</span>
    </div>
</template>