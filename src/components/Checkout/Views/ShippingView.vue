<script setup>
import ShippingOptions from "@/components/Checkout/Shipping/ShippingOptions.vue";
import CartCollapsed from "@/components/Checkout/Cart/CartCollapsed.vue";
import Headline from "@/components/Headline.vue";
import ActionsContainer from "@/components/Checkout/ActionsContainer.vue";
import BackButton from "@/components/Checkout/Buttons/BackButton.vue";
import Translate from "@/components/Translate.vue";
import Button from "@/components/Checkout/Buttons/Button.vue";
import ContactCollapsed from "@/components/Checkout/Customer/ContactCollapsed.vue";
import ShippingAddressCollapsed from "@/components/Checkout/Customer/ShippingAddressCollapsed.vue";
</script>
<template>
    <CartCollapsed/>
    <div class="grid grid-cols-2 gap-4 my-4">
        <ContactCollapsed/>
        <ShippingAddressCollapsed/>
    </div>
    <Headline>
        <Translate me="shipping-method"/>
    </Headline>
    <ShippingOptions/>
    <ActionsContainer>
        <router-link :to="{ name: 'customer' }">
            <BackButton>
                <Translate me="back-to-customer"/>
            </BackButton>
        </router-link>
        <!-- @todo only if shippings are available -->
        <router-link :to="{ name: 'payment' }">
            <Button>
                <Translate me="payment"/>
                <span>→</span>
            </Button>
        </router-link>
    </ActionsContainer>
</template>