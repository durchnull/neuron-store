<script setup>
import Navigation from "@/components/Checkout/Navigation.vue";
import {cartSetup} from "@/services/CartSetup";
import {useCartStore} from "@/stores/CartStore";

const props = defineProps({
    url: String,
    token: String,
})

cartSetup(props.url, props.token)

const cartStore = useCartStore()
</script>
<template>
    <header v-if="cartStore.exist">
        <Navigation/>
    </header>
    <main v-if="cartStore.exist"
          class="p-8 mx-auto max-w-4xl"
    >
        <router-view></router-view>
    </main>
</template>