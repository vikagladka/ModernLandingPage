// vite.config.js
export default {
    root: './',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: './index.html',
        },
    },
};