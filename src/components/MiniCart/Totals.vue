<script setup>
import Price from "@/components/MiniCart/Price.vue";
import {useCartStore} from "@/stores/CartStore.js";
import Translate from "@/components/Translate.vue";

const cartStore = useCartStore()
</script>

<template>
    <div class="font-medium">
        <table class="table-auto">
            <tbody>
            <tr>
                <td class="w-full align-top pb-2">
                    <Translate me="subtotal"/>
                </td>
                <td class="flex flex-col items-end pb-2">
                    <Price :amount="cartStore.cart.items_amount"
                           :key="cartStore.cart.id + cartStore.cart.items_amount"
                    />
                    <Price :amount="-cartStore.cart.items_discount_amount"
                           :key="cartStore.cart.id + cartStore.cart.items_discount_amount"
                           v-if="cartStore.cart.items_discount_amount"
                           class="text-green-600"
                    />
                </td>
            </tr>
            <tr>
                <td class="w-full align-top pb-2">
                    <Translate me="shipping"/>
                </td>
                <td class="flex flex-col items-end pb-2">
                    <Price :amount="cartStore.cart.shipping_amount"
                    />
                    <Price :amount="-cartStore.cart.shipping_discount_amount"
                           v-if="cartStore.cart.shipping_discount_amount"
                           class="text-green-600"
                    />
                </td>
            </tr>
            <tr class="sticky top-0">
                <td class="w-full pt-4 items-end text-lg font-bold">
                    <Translate me="total"/>
                </td>
                <td class="pt-4 text-right">
                    <Price :amount="cartStore.cart.amount"
                           :key="cartStore.id + cartStore.cart.amount"
                           class="text-xl font-bold"
                    />
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>