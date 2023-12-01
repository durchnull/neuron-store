import { reactive } from 'vue'

export const useMiniCartStore = reactive({
    isOpen: false,
    toggle() {
        this.isOpen = ! this.isOpen
    },
})