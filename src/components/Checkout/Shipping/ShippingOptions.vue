<script setup>
import {useOptionsStore} from "@/stores/OptionsStore";
import {useCartStore} from "@/stores/CartStore";
import Price from "@/components/MiniCart/Price.vue";

const optionsStore = useOptionsStore()
const cartStore = useCartStore()

const shippingAddressCountryCode = cartStore.cart.shipping_address?.country_code

const shippings = shippingAddressCountryCode
    ? optionsStore.shippingsByCountry(shippingAddressCountryCode)
    : optionsStore.shippings

function active(shippingId) {
    return cartStore.cart.shipping.id === shippingId
}

function updateShipping(shippingId) {
    cartStore.updateShipping(shippingId)
}

</script>
<template>
    <div v-if="shippings.length"
        class="grid gap-2"
    >
        <button v-for="shipping in shippings"
                type="button"
                @click="updateShipping(shipping.id)"
                class="flex items-center justify-between w-full p-4 border rounded text-left"
                :class="{
                    'border-blue-300 bg-blue-50' : active(shipping.id),
                    'hover:border-blue-300 cursor-pointer' : !active(shipping.id),
                 }"
        >
            <span class="flex items-center justify-center w-5 h-5 rounded-full border bg-gray-50">
                <span class="w-3 h-3 rounded-full transition-colors"
                      :class="{
                            'bg-blue-500' : active(shipping.id),
                            'group-hover:bg-blue-200' : !active(shipping.id),
                       }"
                ></span>
            </span>
            <span class="flex-1 mx-4 font-medium">{{ shipping.name }}</span>
            <Price :amount="shipping.net_price"/>
        </button>
    </div>
    <div v-else>No shipping methods available for country</div>
</template>