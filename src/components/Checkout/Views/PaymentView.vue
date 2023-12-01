<script setup>
import {useCartStore} from "@/stores/CartStore";
import CartCollapsed from "@/components/Checkout/Cart/CartCollapsed.vue";
import ShippingCollapsed from "@/components/Checkout/Shipping/ShippingCollapsed.vue";
import Totals from "@/components/MiniCart/Totals.vue";
import Coupons from "@/components/MiniCart/Coupons.vue";
import PaymentOptions from "@/components/Checkout/Payment/PaymentOptions.vue";
import PaymentOption from "@/components/Checkout/Payment/PaymentOption.vue";
import ProxyPaymentMethodCollapsed from "@/components/Checkout/Payment/ProxyPaymentMethodCollapsed.vue";
import ContactCollapsed from "@/components/Checkout/Customer/ContactCollapsed.vue";
import ShippingAddressCollapsed from "@/components/Checkout/Customer/ShippingAddressCollapsed.vue";

// @todo refactor
const payment = useCartStore().cart.payment
const showSelectedProxyPayment = payment.name === 'AmazonPay'
</script>
<template>
    <CartCollapsed/>
    <div class="grid grid-cols-2 gap-4 my-4">
        <ContactCollapsed/>
        <ShippingAddressCollapsed/>
    </div>
    <div class="grid grid-cols-2 gap-4 my-4">
        <ShippingCollapsed/>
        <ProxyPaymentMethodCollapsed v-if="showSelectedProxyPayment"/>
    </div>
    <Coupons class="my-4"/>
    <div class="p-6 my-4 border rounded">
        <Totals/>
    </div>
    <PaymentOption
        v-if="showSelectedProxyPayment"
        :payment="payment"
    />
    <div v-if="showSelectedProxyPayment"
         class="my-4"
    >
        <p>Select different payment method</p>
    </div>
    <PaymentOptions
        v-else
        class="my-4"
    />
</template>