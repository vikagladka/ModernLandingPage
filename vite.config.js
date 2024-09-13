import { defineConfig } from 'vite';
import { resolve } from 'path';
import viteCompression from 'vite-plugin-compression'; // Для gzip-компресії (аналог compress у Webpack)
import { createHtmlPlugin } from 'vite-plugin-html';
import copy from 'rollup-plugin-copy'; // Плагін для копіювання файлів

export default defineConfig({
    root: './src',
    build: {
        outDir: '../dist',
        cssCodeSplit: true,

        rollupOptions: {
            input: resolve(__dirname, 'src/index.html'),
            output: {
                chunkFileNames: 'js/[name].js',
                entryFileNames: 'js/[name].js',
                assetFileNames: assetInfo => {
                    if (assetInfo.name.endsWith('.css')) {
                        return 'css/[name].[ext]';
                    }
                    return 'images/[name].[ext]';
                },
            },
        },
    },

    server: {
        port: 9000,
        open: true,
        hmr: true,
    },
    plugins: [
        createHtmlPlugin({
            inject: {
                data: {
                    title: 'Vite Project',
                },
            },
        }),

        viteCompression(),
        copy({
            targets: [
                { src: 'src/scss/reset.css', dest: 'dist/css' },
            ],
            hook: 'buildStart',
        }),
    ],
});
