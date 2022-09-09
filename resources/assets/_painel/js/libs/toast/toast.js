"use strict";

const createToastContainerInTheDom = () => {
    document.body.insertAdjacentHTML('afterbegin', `
        <div aria-live="polite" aria-atomic="true" class="position-relative top-0 end-0" style="z-index: 9999">
            <div class="toast-container position-absolute top-0 end-0 p-3" id="toast-container"></div>
        </div>
    `);

}

window.toast = (message = '', type = "success") => {
    let countToastDiv = document.getElementsByClassName('toast').length;
    let toastContainer = document.querySelector('#toast-container');
    if (!toastContainer) {
        createToastContainerInTheDom();
    }

    let toastHtml = `
        <div class="toast show toast-${type}" role="alert" aria-live="assertive" aria-atomic="true" id="toast-${countToastDiv}">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}.
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>`

    document.querySelector('#toast-container').insertAdjacentHTML('afterbegin', toastHtml);

    setTimeout(function () {
        document.querySelector(`#toast-${countToastDiv}`).remove();
    }, 3500 + (countToastDiv * 500));
}