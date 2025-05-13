
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
    plugins: [
        viteCompression({
            algorithm: 'gzip', // of 'brotliCompress'
            ext: '.gz',        // of '.br'
        }),
    ],
})