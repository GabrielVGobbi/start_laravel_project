window._ = require('lodash');

try {
    window.bootstrap = require('bootstrap');
} catch (e) { }

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common = {
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    //'Authorization': 'Bearer ' + window.Laravel.apiToken,
};

window.base_url_api = document.querySelector('meta[ref="js-base_url_api"]').content
window.base_url = document.querySelector('meta[ref="js-base_url"]').content