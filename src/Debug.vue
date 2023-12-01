<script setup>
import {useCartStore} from "@/stores/CartStore";
import {useOptionsStore} from "@/stores/OptionsStore";
import {ref} from "vue";
import ProductOptions from "@/components/MiniCart/ProductOptions.vue";

const cartStore = useCartStore()
const optionsStore = useOptionsStore()
const debug = ref(false)

const toggleDebug = () => {
    debug.value = !debug.value
}

const clear = () => {
    optionsStore.clear()
    cartStore.clear()
}

function sizeof(localStorageKey) {
    const item = localStorage.getItem(localStorageKey);
    if (!item) {
        return 0;
    }

    // If the item is not a string, convert it to a string
    const itemString = typeof item === 'string' ? item : JSON.stringify(item);

    // Calculate the size in bytes (approximation)
    const sizeInBytes = new Blob([itemString]).size;

    // Return size in bytes
    return sizeInBytes;
}

const key1 = 'neuron_cart';
const size1 = sizeof(key1);
//console.log(`Size of ${key1} in localStorage: ${size1} bytes`);

const key2 = 'neuron_options';
const size2 = sizeof(key2);
//console.log(`Size of ${key2} in localStorage: ${size2} bytes`);
</script>
<template>
    <div class="pt-4 mt-4 border-t">
        <ProductOptions/>
        <div class="max-w-6xl mx-auto grid gap-1 text-xs my-4">
            <div class="flex gap-4">
                <button @click="toggleDebug()"
                        class="py-1 px-2 rounded font-bold border hover:border-black"
                        :class="{ 'bg-black text-white' : debug }"
                >DEBUG
                </button>
                <button @click="clear()"
                        class="py-1 px-2 rounded font-bold border hover:border-black"
                >CLEAR
                </button>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <pre v-show="debug" class="p-4 border rounded-lg text-xs overflow-scroll"><b>Cart</b><br>
                    {{ cartStore.cart || 'no cart' }}
                </pre>
                <pre v-show="debug" class="p-4 border rounded-lg text-xs overflow-scroll"><b>Payments</b><br>
                    {{ optionsStore.payments }}
                </pre>
                <pre v-show="debug" class="p-4 border rounded-lg text-xs overflow-scroll"><b>Shippings</b><br>
                    {{ optionsStore.shippings || 'no shippings' }}
                </pre>
            </div>
        </div>
    </div>
</template>