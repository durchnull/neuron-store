<script setup>
import {useCartStore} from "@/stores/CartStore.js";
import {useMiniCartStore} from "@/stores/MiniCartStore.js";
import MiniCart from "@/components/MiniCart/MiniCart.vue";
import {cartSetup} from "@/services/CartSetup";

const props = defineProps({
    url: String,
    token: String,
})

cartSetup(props.url, props.token)

const cartStore = useCartStore();

const open = () => {
    if (!useMiniCartStore.isOpen) {
        useMiniCartStore.toggle()
    }
}

const close = () => {
    if (useMiniCartStore.isOpen) {
        useMiniCartStore.toggle()
    }
}

const quantity = () => {
    return cartStore.exist ? cartStore.itemsQuantity : 0
}

const add = async (productId, quantity, configuration = null, callback) => {
    try {
        await cartStore.itemAdd(productId, quantity, configuration)

        if (callback && typeof callback === 'function') {
            callback()
        }
    } catch (error) {
        console.error('Cart add', error, error?.code)
    }
}

window.Neuron = {
    add,
    open,
    close,
    quantity
};
</script>

<template>
    <div class="mx-auto max-w-6xl p-4 text-xs font-bold"
         @click="cartStore.clear()"
    >Clear</div>
    <MiniCart v-if="cartStore.exist"/>
</template>