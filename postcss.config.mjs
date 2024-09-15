import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';

export default {
    plugins: [
        postcssImport(), //allows to manage and combine multiple CSS files into one.
        autoprefixer(),//ensures that your CSS works in older browsers by automatically adding necessary vendor prefixes.
    ],
};