<script setup>
import {inject} from "vue";
import {useMiniCartStore} from "@/stores/MiniCartStore.js";
import Coupons from "@/components/MiniCart/Coupons.vue";
import Totals from "@/components/MiniCart/Totals.vue";
import Items from "@/components/Checkout/Cart/Items.vue";
import Translate from "@/components/Translate.vue";

const links = inject('links');

const checkout = () => {
    window.location = links.shopUrl + '/checkout'
}
</script>
<template>
    <Transition
        enter-from-class="translate-x-full opacity-0"
        enter-active-class="transform transition duration-200"
        leave-active-class="transform transition duration-200"
        leave-to-class="translate-x-full opacity-0"
    >
        <div v-show="useMiniCartStore.isOpen"
             class="fixed z-50 top-0 right-0 h-screen max-w-xs"
        >
            <div class="h-full border-l bg-white shadow-xl overflow-y-scroll">
                <div class="sticky top-0 flex justify-between items-center p-4 bg-white z-10">
                    <span class="font-bold">
                        <Translate me="cart"/>
                    </span>
                    <button @click="useMiniCartStore.toggle()"
                            class="w-10 h-10 bg-gray-50 hover:bg-gray-100"
                    >&#10005;
                    </button>
                </div>
                <Items class="p-4"/>
                <Coupons class="p-4"/>
                <Totals class="p-4"/>
                <button type="button"
                        @click="checkout()"
                        class="block w-full px-4 py-3 text-center text-black bg-yellow-400 hover:bg-yellow-500 transition-colors"
                >
                    <Translate me="proceed-to-checkout"/>
                </button>
            </div>
        </div>
    </Transition>
</template>