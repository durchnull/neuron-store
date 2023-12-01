<script setup>
import {useCartStore} from "@/stores/CartStore.js";
import Item from "@/components/Item.vue";

const cartStore = useCartStore();
</script>
<template>
    <div class="flex flex-col gap-8">
        <Item v-for="item in cartStore.items"
              :item="item"
              :key="item.id"
        />
    </div>
</template>