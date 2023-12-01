<script setup>
import {useCartStore} from "@/stores/CartStore.js";
import {ref} from "vue";
import Translate from "@/components/Translate.vue";

const cartStore = useCartStore()

const code = ref('')

function redeem() {
    cartStore.couponRedeem(code.value)
    this.code = ''
}

function remove(code) {
    cartStore.couponRemove(code)
}

</script>
<template>
    <div class="grid gap-4">
        <div class="flex">
            <input type="text"
                   v-model.trim="code"
                   class="w-full px-4 py-2 border border-r-0 rounded-l"
                   placeholder="Enter coupon"
            >
            <input type="submit"
                   @click="redeem()"
                   value="Apply"
                   class="py-2 px-4 bg-gray-400 hover:bg-gray-500 cursor-pointer text-white rounded-r"
            />
        </div>
        <div v-if="cartStore.cart.coupons.length">

            <div v-for="coupon in cartStore.cart.coupons">
                <div
                    class="inline-flex items-center rounded font-medium text-gray-600 bg-gray-100"
                >
                    <span class="pl-3 pr-1">{{ coupon.code }}</span>
                    <button @click="remove(coupon.code)"
                            type="button"
                            class="py-1 px-2 hover:bg-gray-200 rounded-r"
                    >
                        ×
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>