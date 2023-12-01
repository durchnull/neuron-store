<script setup>
import Price from "@/components/MiniCart/Price.vue";
import {useCartStore} from "@/stores/CartStore.js";
import {useOptionsStore} from "@/stores/OptionsStore.js";
import ItemThumbnail from "@/components/ItemThumbnail.vue";
import Translate from "@/components/Translate.vue";

const cartStore = useCartStore()
const optionsStore = useOptionsStore()

const {item} = defineProps({
    item: Object
})

const product = optionsStore.getProductById(item.product_id)
</script>
<template>
    <div>
        <div class="flex gap-4 items-start justify-between">
            <ItemThumbnail
                :url="product.image_url"
                :quantity="item.quantity"
            />
            <div class="flex-1 px-1">{{ product.name }}</div>
            <div class="flex flex-col items-end">
                <Price :amount="item.total_amount"
                       :key="item.id + item.total_amount"
                       class="text-lg text-gray-800"
                />
                <Price :amount="-item.discount_amount"
                       :key="item.id + item.discount_amount"
                       v-if="item.discount_amount"
                       class="text-green-600"
                />
            </div>
        </div>
        <button @click="cartStore.itemRemove(item.id)"
                class="mt-2 text-xs text-gray-400 hover:text-gray-300"
        ><Translate me="remove-product"/>
        </button>
    </div>
</template>