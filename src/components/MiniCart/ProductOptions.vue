<script setup>
import {useOptionsStore} from "@/stores/OptionsStore";
import {useCartStore} from "@/stores/CartStore";

const optionsStore = useOptionsStore()
const cartStore = useCartStore()

function add(id) {
    cartStore.itemAdd(id, 1)
}
</script>
<template>
    <div v-if="optionsStore.products"
         class="text-xs text-gray-500"
    >
        <div class="max-w-6xl mx-auto flex gap-4">
            <div v-for="product in optionsStore.products">
                <button type="button"
                        class="border p-1 rounded hover:border-gray-400"
                        @click="add(product.id)"
                >{{ product.name }}
                </button>
            </div>
        </div>
    </div>
</template>