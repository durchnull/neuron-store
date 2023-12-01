import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    build: {
        minify: true,
        sourcemap: true,
        copyPublicDir: false,
        rollupOptions: {
            input: [
                'src/main.js',
            ],
            output: {
                dir: './../neuron/public',
                entryFileNames: 'neuron.js',
            }
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    define: {
        'process.env': dotenv.config().parsed
    }
})
