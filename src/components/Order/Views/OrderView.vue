<script setup>
import {useApiClient} from "@/services/ApiClient";
import {ref} from "vue";
import Price from "@/components/MiniCart/Price.vue";

const isUuid = (value) => {
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidPattern.test(value);
}

let paths = new URL(window.location).pathname.split('/');
paths = paths.slice(paths.indexOf('order') + 1)
const orderId = paths[0]
const orderNumber = paths[1]

const order = ref(null)

if (isUuid(orderId)) {
    try {
        useApiClient()
            .get(orderId)
            .then(data => {
                if (data.number !== orderNumber) {
                    order.value = null
                } else {
                    order.value = data
                }
            })
    } catch (error) {
        console.error('OrderView', error)
    }
} else {
    order.value = null
    console.error('Not a valid uuid')
}
</script>
<template>
    <div v-if="order">
        <p class="mb-8 text-2xl font-bold">Thank your for your order, {{ order.billing_address.first_name }}!</p>
        <div class="p-8 rounded-lg bg-white shadow-lg grid grid-cols-2 gap-4">
            <div>
                <p class="mb-2 font-bold">Contact</p>
                <p>{{ order.customer.email }}</p>
            </div>
            <div>
                <p class="mb-2 font-bold">Contact</p>
                <p>{{ order.customer.phone }}</p>
            </div>
            <div>
                <p class="mb-2 font-bold">Shipping address</p>
                <p>{{ order.shipping_address.first_name }} {{ order.shipping_address.last_name }}<br>
                    {{ order.shipping_address.street }} {{ order.shipping_address.number }}<br>
                    {{ order.shipping_address.postal_code }} {{ order.shipping_address.city }}<br>
                    {{ order.shipping_address.country_code }}
                </p>
            </div>
            <div>
                <p class="mb-2 font-bold">Billing address</p>
                <p>{{ order.billing_address.first_name }} {{ order.billing_address.last_name }}<br>
                    {{ order.billing_address.street }} {{ order.billing_address.number }}<br>
                    {{ order.billing_address.postal_code }} {{ order.billing_address.city }}<br>
                    {{ order.billing_address.country_code }}
                </p>
            </div>
            <div>
                <p class="mb-2 font-bold">Shipping method</p>
                <p>{{ order.shipping.name }}</p>
            </div>
            <div>
                <p class="mb-2 font-bold">Payment method</p>
                <p>{{ order.payment.name }}</p>
                <p>
                    <Price :amount="order.amount"/>
                </p>
            </div>
        </div>
    </div>
    <div v-else
         class="bg-red-50 text-red-700 p-4 rounded border border-red-200"
    >Order not found
    </div>
</template>