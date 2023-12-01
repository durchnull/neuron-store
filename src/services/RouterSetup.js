import {createRouter, createWebHashHistory} from "vue-router";
import CartView from "@/components/Checkout/Views/CartView.vue";
import CustomerView from "@/components/Checkout/Views/CustomerView.vue";
import ShippingView from "@/components/Checkout/Views/ShippingView.vue";
import PaymentView from "@/components/Checkout/Views/PaymentView.vue";
import ProcessingView from "@/components/Checkout/Views/ProcessingView.vue";
import {useCartStore} from "@/stores/CartStore";
import {useOptionsStore} from "@/stores/OptionsStore";

export function routerSetup(shopUrl) {
    const routes = [
        {
            path: '/',
            redirect: 'cart',
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartView
        },
        {
            path: '/customer',
            name: 'customer',
            component: CustomerView
        },
        {
            path: '/shipping',
            name: 'shipping',
            component: ShippingView
        },
        {
            path: '/payment',
            name: 'payment',
            component: PaymentView
        },
        {
            path: '/processing',
            name: 'processing',
            component: ProcessingView
        },
    ];

    const router = createRouter({
        base: shopUrl,
        history: createWebHashHistory(),
        routes
    })

    router.beforeEach((to, from) => {
        const cartStore = useCartStore()
        const optionsStore = useOptionsStore()
        const orderUrl = shopUrl + '/order/' + cartStore.cart.id + '/' + cartStore.cart.number

        // @todo test all
        if (to.name !== 'cart' && cartStore.empty) {
            console.warn('ROUTER', 'Cart is empty')
            return {name: 'cart'}
        } else if ((to.name === 'customer' || to.name === 'shipping') && optionsStore.slowPayments.length === 0) {
            console.warn('ROUTER', 'No slow payments')
            return {name: 'cart'}
        } else if (to.name === 'payment' && (!cartStore.cart.customer || !cartStore.cart.shipping_address)) {
            //console.warn('ROUTER', 'Customer required')
            //return {name: 'customer'}
        } else if (from.name !== 'processing' && cartStore.cart.status === 'pending') {
            console.warn('ROUTER', 'Pending cart')
            return {name: 'processing'}
        } else if (window.location.href !== orderUrl && cartStore.cart.status === 'accepted' || cartStore.cart.status === 'confirmed') {
            console.warn('ROUTER', 'Accepted/Confirmed order')
            cartStore.clear()
            window.location = orderUrl
            return false
        }

        return true
    })

    return router
}