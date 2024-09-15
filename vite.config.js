import { defineConfig } from 'vite';
import { resolve } from 'path';
import viteCompression from 'vite-plugin-compression';
import { createHtmlPlugin } from 'vite-plugin-html';
import copy from 'rollup-plugin-copy';

export default defineConfig({
    root: './src',
    build: {
        outDir: '../dist',
        cssCodeSplit: true,
        emptyOutDir: true,
        rollupOptions: {
            input: resolve(__dirname, 'src/index.html'),
            output: {
                assetFileNames: assetInfo => {
                    if (assetInfo.name.endsWith('.css')) {
                        return 'styles/[name].[ext]'; //CHAnged ot rollup pluging because it is able to make map of css file as well as copy it to dist directory
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
                { src: 'src/styles/reset.css', dest: 'dist/styles' },
            ],
            hook: 'buildStart',
        }),
    ],
});
