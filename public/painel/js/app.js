!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e||self).autosize=t()}(this,function(){var e,t,n="function"==typeof Map?new Map:(e=[],t=[],{has:function(t){return e.indexOf(t)>-1},get:function(n){return t[e.indexOf(n)]},set:function(n,o){-1===e.indexOf(n)&&(e.push(n),t.push(o))},delete:function(n){var o=e.indexOf(n);o>-1&&(e.splice(o,1),t.splice(o,1))}}),o=function(e){return new Event(e,{bubbles:!0})};try{new Event("test")}catch(e){o=function(e){var t=document.createEvent("Event");return t.initEvent(e,!0,!1),t}}function r(e){var t=n.get(e);t&&t.destroy()}function i(e){var t=n.get(e);t&&t.update()}var l=null;return"undefined"==typeof window||"function"!=typeof window.getComputedStyle?((l=function(e){return e}).destroy=function(e){return e},l.update=function(e){return e}):((l=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return function(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!n.has(e)){var t,r=null,i=null,l=null,d=function(){e.clientWidth!==i&&c()},u=function(t){window.removeEventListener("resize",d,!1),e.removeEventListener("input",c,!1),e.removeEventListener("keyup",c,!1),e.removeEventListener("autosize:destroy",u,!1),e.removeEventListener("autosize:update",c,!1),Object.keys(t).forEach(function(n){e.style[n]=t[n]}),n.delete(e)}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",u,!1),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",c,!1),window.addEventListener("resize",d,!1),e.addEventListener("input",c,!1),e.addEventListener("autosize:update",c,!1),e.style.overflowX="hidden",e.style.wordWrap="break-word",n.set(e,{destroy:u,update:c}),"vertical"===(t=window.getComputedStyle(e,null)).resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),r="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),isNaN(r)&&(r=0),c()}function a(t){var n=e.style.width;e.style.width="0px",e.style.width=n,e.style.overflowY=t}function s(){if(0!==e.scrollHeight){var t=function(e){for(var t=[];e&&e.parentNode&&e.parentNode instanceof Element;)e.parentNode.scrollTop&&t.push({node:e.parentNode,scrollTop:e.parentNode.scrollTop}),e=e.parentNode;return t}(e),n=document.documentElement&&document.documentElement.scrollTop;e.style.height="",e.style.height=e.scrollHeight+r+"px",i=e.clientWidth,t.forEach(function(e){e.node.scrollTop=e.scrollTop}),n&&(document.documentElement.scrollTop=n)}}function c(){s();var t=Math.round(parseFloat(e.style.height)),n=window.getComputedStyle(e,null),r="content-box"===n.boxSizing?Math.round(parseFloat(n.height)):e.offsetHeight;if(r<t?"hidden"===n.overflowY&&(a("scroll"),s(),r="content-box"===n.boxSizing?Math.round(parseFloat(window.getComputedStyle(e,null).height)):e.offsetHeight):"hidden"!==n.overflowY&&(a("hidden"),s(),r="content-box"===n.boxSizing?Math.round(parseFloat(window.getComputedStyle(e,null).height)):e.offsetHeight),l!==r){l=r;var i=o("autosize:resized");try{e.dispatchEvent(i)}catch(e){}}}}(e)}),e}).destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],r),e},l.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],i),e}),l});

console.log('init app')

"use strict";

/*--------------------------------------------------------------
# functions
el = elemento selecionado
all = se são todos
--------------------------------------------------------------*/
window.select = (el, all = false) => {
    if (el) {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }
}

window.on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
        if (all) {
            selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
            selectEl.addEventListener(type, listener)
        }
    }
}

window.preload = (name = 'preload', width = "md") => {
    return `
        <div class="d-flex justify-content-center ${name} mb-5" id="preload-${name}">
          <div class="spinner-border text-primary spinner-border-${width}" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
    `;
}

window.buttonPreload = text => {
    return `<span class="spinner-border 
        spinner-border-sm" role="status" aria-hidden="true"></span>
        ${text}...`
}

/*--------------------------------------------------------------
# Numbers
--------------------------------------------------------------*/
window.numberFormat = (number) => {
    return number.toLocaleString('pt-br', {
        minimumFractionDigits: 2
    })
}

window.clearNumber = (number) => {
    if (number == '' || number == null) {
        return 0;
    }
    number = number.toString().replace("R$", "").replace(".", "").replace(".", "");
    number = number.replace(",", ".");
    return number != '' ? numeral(number).value() : 0;
}

/*--------------------------------------------------------------
# Inputs
--------------------------------------------------------------*/
let inputsInValid = document.querySelectorAll('input');
inputsInValid.forEach(function (input) {
    input.addEventListener('keyup', (e) => {
        if (e.target.classList.contains('is-invalid')) {
            if (e.target.value != '') {
                e.target.classList.remove('is-invalid');
            }
        }
    })
})

/*--------------------------------------------------------------
# TextAreas
--------------------------------------------------------------*/
autosize(document.querySelectorAll('textarea'));

const addModalConfirmInTheDom = btn => {

    let token = document.querySelector('meta[name="csrf-token"]').content;
    let route = btn.target.dataset.route;
    let text = btn.target.dataset.btnText || 'Deletar';
    let action = btn.target.dataset.action || 'POST';
    let btnClass = btn.target.getAttribute('class');
    let btnHtml = btn.target.innerHTML;

    if (route) {

        let htmlModalEl = `
        <div class="modal fade effect-scale" id="modal-delete" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                <div class="modal-content">
                    <form id="form-confirm" role="form" class="needs-validation" action="${route}" method="POST">
                        <div class="modal-header">
                            <h6 class="modal-title"></h6>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center">
                            <span class="mg-b-0 modal-text-body"></span>
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="modal-cancel" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <input type="hidden" name="_token" value="${token}">
                            <input type="hidden" name="_method" value="${action}">
                            <button type="submit" data-btn-text="" class="btn-modal ${btnClass}">
                                ${btnHtml}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>`
        document.body.insertAdjacentHTML('beforeend', htmlModalEl);

        let actionModalEl = new bootstrap.Modal(document.querySelector('#modal-delete'))
        let modalEl = document.querySelector('#modal-delete');
        modalEl.querySelector('.modal-title').innerHTML = text;
        modalEl.querySelector('.modal-text-body').innerHTML = `Tem certeza que deseja ${text}?`;
        if (btn.target.dataset.observation) {
            modalEl.querySelector('.modal-body').insertAdjacentHTML('beforeend',
                `<div class="form-group mt-2">
                <label for="input-observations">Motivo</label>
                <textarea name="observations" type="text" class="form-control" rows="5"
                    id="input-observations" required></textarea>
            </div>`
            );
        }
        actionModalEl.show();
        modalEl.addEventListener('hidden.bs.modal', function (event) {
            modalEl.remove();
        })
    }
}

document.querySelectorAll('[data-js=btn-confirm-submit]').forEach(item => {
    item.addEventListener('click', addModalConfirmInTheDom);
})


/*--------------------------------------------------------------
# Forms
--------------------------------------------------------------*/
const resetButtonSubmit = (button, htmlOld) => {
    button.innerHTML = htmlOld;
    button.disabled = false;
}

on('click', '[type="submit"]', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const button = e.target;
    const form = button.closest('form');
    const buttonHtmlOld = button.innerHTML;
    const buttonDataText = button.dataset.text ?? 'Salvando';

    button.innerHTML = '';
    button.innerHTML = buttonPreload(buttonDataText);
    button.disabled = true;

    if (!form.checkValidity()) {
        form.classList.add('was-validated')
        resetButtonSubmit(button, buttonHtmlOld);
        return;
    }

    if (form.dataset.type) {
        let formValid = await formSubmitApi(form);
        let isValid = formValid;
        if (isValid) {
            form.reset();
        }
        resetButtonSubmit(button, buttonHtmlOld);
        return;
    }

    form.submit();
}, true)

/*--------------------------------------------------------------
# Tabs
--------------------------------------------------------------*/
let triggerTabList = [].slice.call(document.querySelectorAll('ul[role=tablist]'))
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
triggerTabList.forEach(function (triggerEl) {
    if (params.tab) {
        let urlTabParam = params.tab
        let aTabSaved = triggerEl.querySelector(`a[href="#${urlTabParam}"]`)
        if (aTabSaved) {
            bootstrap.Tab.getOrCreateInstance(aTabSaved).show()
        }
    } else {
        let aEls = triggerEl.querySelectorAll('a[data-bs-toggle="tab"]');
        let screen = triggerEl.dataset.screen ?? null;
        aEls.forEach(aEl => {
            aEl.addEventListener('click', () => {
                localStorage.setItem(`${triggerEl.getAttribute('id')}_${screen}`, JSON.stringify(aEl.getAttribute('href')));
            });
        })
        let tabSaved = JSON.parse(localStorage.getItem(`${triggerEl.getAttribute('id')}_${screen}`));
        let aTabSaved = triggerEl.querySelector(`a[href="${tabSaved}"]`)
        if (aTabSaved) {
            bootstrap.Tab.getOrCreateInstance(aTabSaved).show()
        }
    }
})

/*--------------------------------------------------------------
# Tooltip
--------------------------------------------------------------*/
let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})


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
const setMask = (classname, settings) => {
    const inputs = document.querySelectorAll(`[data-js-mask=${classname}`)
    if (inputs) {
        inputs.forEach(input => {
            IMask(input, settings)
        })
    }
}

setMask('phone', {
    mask: [{
        mask: '+55 (00) 0000-0000'
    }, {
        mask: '+55 (00) 00000-0000'
    }]
})

setMask('cep', {
    mask: [{
        mask: '00000-000'
    }]
})

setMask('cpfCnpj', {
    mask: [{
        mask: '000.000.000-00'
    }, {
        mask: '00.000.000/0000-00'
    }]
})