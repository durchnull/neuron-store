import {useApiClient} from "@/services/ApiClient";
import {useCartStore} from "@/stores/CartStore";
import {useOptionsStore} from "@/stores/OptionsStore";

export function cartSetup(url, token) {
    useApiClient(url, token)

    const cartStore = useCartStore();
    const optionsStore = useOptionsStore();

    optionsStore.load()
        .then(() => {
            if (cartStore.exist) {
                cartStore.get()
            } else {
                cartStore.create(optionsStore.defaultShippingId, optionsStore.defaultPaymentId)
            }
        })
}