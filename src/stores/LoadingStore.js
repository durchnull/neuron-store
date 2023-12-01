import { reactive } from 'vue'

export const useLoadingStore = reactive({
    isLoading: false,
    setLoading(isLoading) {
        this.isLoading = isLoading;
    },
})