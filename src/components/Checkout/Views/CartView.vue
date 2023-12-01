<script setup>
import {useRouter} from "vue-router";
import {inject} from "vue";
import {useCartStore} from "@/stores/CartStore";
import {useOptionsStore} from "@/stores/OptionsStore";
import Items from "@/components/Checkout/Cart/Items.vue";
import ActionsContainer from "@/components/Checkout/ActionsContainer.vue";
import Translate from "@/components/Translate.vue";
import QuickPaymentOptions from "@/components/Checkout/Payment/QuickPaymentOptions.vue";
import ButtonLoading from "@/components/ButtonLoading.vue";
import Button from "@/components/Checkout/Buttons/Button.vue";
import BackButton from "@/components/Checkout/Buttons/BackButton.vue";

const cartStore = useCartStore()
const optionsStore = useOptionsStore()
const router = useRouter()
const links = inject('links');

const slowPaymentsExist = optionsStore.slowPayments.length > 0

const proceedAndSetDefaultPayment = async () => {
    if (cartStore.cart.payment.id !== optionsStore.defaultPaymentId) {
        await cartStore.updatePayment(optionsStore.defaultPaymentId)
    }
    
    await router.push({name: 'customer'})
}
</script>
<template>
    <Items/>
    <div v-if="!cartStore.empty">
        <QuickPaymentOptions class="my-4"/>
        <ActionsContainer v-if="slowPaymentsExist">
            <span></span>
            <Button type="button"
                    @click="proceedAndSetDefaultPayment()"
            >
                <Translate me="proceed-to-checkout"/>
                <ButtonLoading/>
            </Button>
        </ActionsContainer>
    </div>
    <div v-else>
        <p class="p-4 rounded border border-yellow-300 bg-yellow-100 text-yellow-600">Your cart is empty</p>
        <a :href="links.shopUrl">
            <BackButton>Back to shop</BackButton>
        </a>
    </div>
</template>