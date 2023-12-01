import './assets/app.css'

import {createApp, markRaw} from 'vue'
import {createPinia} from 'pinia'
import {routerSetup} from "@/services/RouterSetup";
import Cart from '@/Cart.vue'
import Checkout from "@/Checkout.vue";
import Order from "@/Order.vue";
import OrderView from "@/components/Order/Views/OrderView.vue";
import {createRouter, createWebHashHistory} from "vue-router";

// Create a global Neuron object to initialize cart or checkout
window.Neuron = (
    url,
    token,
    shopUrl = '/',
    cartElement = 'cart',
    checkoutElement = 'checkout',
    orderElement = 'order',
) => {
    if (document.getElementById(cartElement)) {
        createApp(Cart, {
            url,
            token,
        })
            .use(createPinia())
            .provide('links', {
                shopUrl: shopUrl
            })
            .mount('#' + cartElement)
    } else if (document.getElementById(checkoutElement)) {
        const router = routerSetup(shopUrl)

        const pinia = createPinia().use(({store}) => {
            store.$router = markRaw(router)
        })

        createApp(Checkout, {
            url,
            token,
        })
            .use(pinia)
            .use(router)
            .provide('links', {
                shopUrl: shopUrl
            })
            .mount('#' + checkoutElement)
    } else if (document.getElementById(orderElement)) {
        const routes = [
            {
                path: '/',
                name: 'order',
                component: OrderView
            },
        ];

        const router = createRouter({
            base: window.location.pathname,
            history: createWebHashHistory(),
            routes
        })

        createApp(Order, {
            url,
            token,
        })
            .use(router)
            .provide('links', {
                shopUrl: shopUrl
            })
            .mount('#' + orderElement)
    }
};

// @todo Remove for production
if (import.meta.env.DEV) {
    if (process.env.API_URL !== 'null' && process.env.API_TOKEN !== 'null') {
        Neuron(
            process.env.API_URL,
            process.env.API_TOKEN,
        )
    }
}