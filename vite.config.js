import { defineConfig } from 'vite';
import { resolve } from 'path';
import viteCompression from 'vite-plugin-compression';
import { createHtmlPlugin } from 'vite-plugin-html';
// import copy from 'rollup-plugin-copy';

export default defineConfig({
    root: './src',
    build: {
        outDir: '../dist',
        cssCodeSplit: true,
        emptyOutDir: true,
        sourcemap: true, // Ensure sourcemap is enabled
        rollupOptions: {
            input: resolve(__dirname, 'src/index.html'),
            output: {
                assetFileNames: assetInfo => {
                    if (assetInfo.name.endsWith('.css')) {
                        return 'styles/[name].[ext]'; // Output CSS to the styles directory
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
        viteCompression({
            algorithm: 'gzip',
            ext: '.gz',
            threshold: 10240,  // Only compress files larger than 10KB
            deleteOriginFile: false, // Keep original uncompressed files
        }),
        //Custom Copy configuration removed because Vite has build-in fucntionality to copy static files to dist - to enable it you must add stic files to public directory in src folder

        // copy({
        //     targets: [
        //         { src: 'src/styles/reset.css', dest: 'dist/styles' },
        //     ],
        //     hook: 'buildEnd',
        // }),
    ],
});