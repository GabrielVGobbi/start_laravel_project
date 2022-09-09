const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    //.js('resources/assets/_painel/js/vendor.js', 'public/painel/js')
    //.sass('resources/assets/_painel/sass/main.scss', 'public/painel/css')
    .sass('resources/assets/_painel/sass/app.scss', 'public/painel/css')


    .scripts([
        'resources/assets/_painel/js/libs/autosize/autosize.min.js',
        'resources/assets/_painel/js/painel.js',
        'resources/assets/_painel/js/libs/toast/toast.js',
        'resources/assets/_painel/js/libs/mask/mask.js',
    ], 'public/painel/js/app.js')

    .sourceMaps()
    .version();
