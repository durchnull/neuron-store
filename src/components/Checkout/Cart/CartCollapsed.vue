<script setup>
import {useCartStore} from "@/stores/CartStore.js";
import {useOptionsStore} from "@/stores/OptionsStore";
import Price from "@/components/MiniCart/Price.vue";
import ItemThumbnail from "@/components/ItemThumbnail.vue";

const cartStore = useCartStore();
const optionsStore = useOptionsStore()
</script>
<template>
    <div class="flex items-center justify-between">
        <div class="flex items-center justify-between gap-4">
            <ItemThumbnail
                v-for="item in cartStore.items"
                :url="optionsStore.getProductById(item.product_id).image_url"
                :quantity="item.quantity"
            />
        </div>
        <Price :amount="cartStore.cart.items_amount - cartStore.cart.items_discount_amount"
               class="font-medium"
        />
    </div>
</template>