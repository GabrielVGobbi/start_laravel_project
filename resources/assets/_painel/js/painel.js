"use strict";

/*--------------------------------------------------------------
# Constantes
--------------------------------------------------------------*/


/*--------------------------------------------------------------
# Functions
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
    return `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        ${text}...`
}

const addModalConfirmInTheDom = btn => {
    let token = document.querySelector('meta[name="csrf-token"]').content;
    let action = btn.target.dataset.action;
    let text = btn.target.dataset.text || 'Deletar';

    let htmlModalDelete = `
        <div class="modal fade effect-scale" id="modal-delete" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title"></h6>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p class="mg-b-0 modal-text-body"></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="modal-cancel" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <form id="form-delete" role="form" class="needs-validation" action="${action}" method="POST">
                            <input type="hidden" name="_token" value="${token}">
                            <input type="hidden" name="_method" value="DELETE">
                            <button type="submit" data-btn-text="Deletando" class="btn btn-danger
                                    btn-submit modal-btn-danger">
                                    <i class="fas fa-trash"></i> Deletar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>`

    document.body.insertAdjacentHTML('beforeend', htmlModalDelete);

    let actionModalDelete = new bootstrap.Modal(document.querySelector('#modal-delete'))
    let modalDelete = document.querySelector('#modal-delete');
    modalDelete.querySelector('.modal-title').innerHTML = text;
    modalDelete.querySelector('.btn-danger').innerHTML = text;
    modalDelete.querySelector('.modal-text-body').innerHTML = `Tem certeza que deseja ${text}?`;
    actionModalDelete.show();

    modalDelete.addEventListener('hidden.bs.modal', function (event) {
        modalDelete.remove();
    })
}

const axiosCath = (error, form) => {
    let errors = error.data.errors;
    if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
            let inputForm = form.querySelector(`input[name="${key}"]`);
            if (inputForm) {
                inputForm.classList.add('is-invalid');
                inputForm.addEventListener('keyup', (e) => {
                    e.target.classList.remove('is-invalid')
                })
            }

            toast(value[0], 'danger');
        });
    }
}

const formSubmitApi = async (form) => {
    let formData = new FormData(form);
    let formAction = form.getAttribute('action');

    return await axios.post(`${formAction}`, formData)
        .then(response => {
            toast(response.statusText)
            return true;
        }).catch((error) => {
            axiosCath(error.response, form);
            return false;
        });
}

const resetButtonSubmit = (button, htmlOld) => {
    button.innerHTML = htmlOld;
    button.disabled = false;
}

/**
* Form Submit Function
*/
on('click', '[type="submit"]', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const button = e.target;
    const form = button.closest('form');
    const buttonHtmlOld = button.innerHTML;
    button.innerHTML = '';
    const buttonDataText = button.dataset.text ?? 'Salvando';

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
# Listeners
--------------------------------------------------------------*/
select('[data-js="btn-m-delete"]', true).forEach(item => {
    item.addEventListener('click', addModalConfirmInTheDom, false);
})

/*--------------------------------------------------------------
# Tooltip
--------------------------------------------------------------*/
let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

/*--------------------------------------------------------------
# Tab List
--------------------------------------------------------------*/
let triggerTabList = [].slice.call(document.querySelectorAll('[data-js="tab"] .nav-link'))
triggerTabList.forEach(function (triggerEl) {
    let tabTrigger = new bootstrap.Tab(triggerEl)
    triggerEl.addEventListener('click', function (event) {
        event.preventDefault()
        let ulListTab = event.target.closest('ul');
        let ulId = ulListTab.dataset.id;
        let hrfe = tabTrigger._element.getAttribute('href');
        localStorage.setItem(`tab.bs.${ulId}`, hrfe);
        tabTrigger.show()
    })
})

let TabList = [].slice.call(document.querySelectorAll('[data-js="tab"]'))
TabList.forEach((tabEl) => {
    let tabId = tabEl.dataset.id;
    let hrfeLocalStorage = localStorage.getItem(`tab.bs.${tabId}`) ?? null;
    if (hrfeLocalStorage) {
        let triggerEl = tabEl.querySelector(`[href="${hrfeLocalStorage}"]`);
        if (triggerEl) {
            let tabTrigger = new bootstrap.Tab(triggerEl);
            tabTrigger.show();
        }
    }
})

/*--------------------------------------------------------------
# Numbers
--------------------------------------------------------------*/
const clearNumber = (number = 0) => {
    number = number.toString().replace("R$", "")
        .replace(".", "").replace(".", "").replace(",", ".");
    return numeral(number).value();
}

const numberFormat = (number = 0) => {
    return clearNumber(number).toLocaleString('pt-br', {
        minimumFractionDigits: 2
    })
}

/*--------------------------------------------------------------
# TextAreas
--------------------------------------------------------------*/
autosize(document.querySelectorAll('textarea'));

/*--------------------------------------------------------------
# Sidebar
--------------------------------------------------------------*/

function initMetisMenu() {
    //metis menu
    $("#side-menu").metisMenu();
    $(".sub-menu").removeClass('d-none');
}

function initLeftMenuCollapse() {
    $('#vertical-menu-btn').on('click', function (event) {
        event.preventDefault();
        $('body').toggleClass('sidebar-enable');
        if ($(window).width() >= 992) {
            $('body').toggleClass('vertical-collpsed');
        } else {
            $('body').removeClass('vertical-collpsed');
        }
    });

    $('body,html').click(function (e) {
        var container = $("#vertical-menu-btn");
        if (!container.is(e.target) && container.has(e.target).length === 0 && !(e.target).closest('div.vertical-menu')) {
            $("body").removeClass("sidebar-enable");
        }
    });
}

function initActiveMenu() {
    // === following js will activate the menu in left side bar based on url ====
    $("#sidebar-menu a").each(function () {
        var pageUrl = window.location.href.split(/[?#]/)[0];
        if (this.href == pageUrl) {
            $(this).addClass("active");
            $(this).parent().addClass("mm-active"); // add active to li of the current link
            $(this).parent().parent().addClass("mm-show");
            $(this).parent().parent().prev().addClass("mm-active"); // add active class to an anchor
            $(this).parent().parent().parent().addClass("mm-active");
            $(this).parent().parent().parent().parent().addClass("mm-show"); // add active to li of the current link
            $(this).parent().parent().parent().parent().parent().addClass("mm-active");
        }
    });
}

function initMenuItem() {
    $(".navbar-nav a").each(function () {
        var pageUrl = window.location.href.split(/[?#]/)[0];
        if (this.href == pageUrl) {
            $(this).addClass("active");
            $(this).parent().addClass("active");
            $(this).parent().parent().addClass("active");
            $(this).parent().parent().parent().addClass("active");
            $(this).parent().parent().parent().parent().addClass("active");
            $(this).parent().parent().parent().parent().parent().addClass("active");
        }
    });
}

function initMenuItemScroll() {
    // focus active menu in left sidebar
    $(document).ready(function () {
        if ($("#sidebar-menu").length > 0 && $("#sidebar-menu .mm-active .active").length > 0) {
            var activeMenu = $("#sidebar-menu .mm-active .active").offset().top;
            if (activeMenu > 300) {
                activeMenu = activeMenu - 300;
                $(".vertical-menu .simplebar-content-wrapper").animate({ scrollTop: activeMenu }, "slow");
            }
        }
    });
}

function initRightSidebar() {
    // right side-bar toggle
    $('.right-bar-toggle').on('click', function (e) {
        $('body').toggleClass('right-bar-enabled');
    });

    $(document).on('click', 'body', function (e) {
        if ($(e.target).closest('.right-bar-toggle, .right-bar').length > 0) {
            return;
        }

        $('body').removeClass('right-bar-enabled');
        return;
    });
}

function initDropdownMenu() {
    if (document.getElementById("topnav-menu-content")) {
        var elements = document.getElementById("topnav-menu-content").getElementsByTagName("a");
        for (var i = 0, len = elements.length; i < len; i++) {
            elements[i].onclick = function (elem) {
                if (elem.target.getAttribute("href") === "#") {
                    elem.target.parentElement.classList.toggle("active");
                    elem.target.nextElementSibling.classList.toggle("show");
                }
            }
        }
        window.addEventListener("resize", updateMenu);
    }
}

function updateMenu() {
    var elements = document.getElementById("topnav-menu-content").getElementsByTagName("a");
    for (var i = 0, len = elements.length; i < len; i++) {
        if (elements[i].parentElement.getAttribute("class") === "nav-item dropdown active") {
            elements[i].parentElement.classList.remove("active");
            elements[i].nextElementSibling.classList.remove("show");
        }
    }
}

function initPreloader() {
    $(window).on('load', function () {
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
    });
}

function initSettings() {
    if (window.sessionStorage) {
        var alreadyVisited = localStorage.getItem("is_visited");
        var layoutMode = localStorage.getItem("layout_mode");
        var collapseMode = localStorage.getItem("collapse_mode");

        if (!alreadyVisited) {
            localStorage.setItem("is_visited", "dark-mode-switch");
        } else {
            $(".right-bar input:checkbox").prop('checked', false);
            if (alreadyVisited == 'dark-mode-switch') {
                $("#mode-switch").prop('checked', true)
            } else {
                $("#mode-switch").prop('checked', false)
            }
            updateThemeSetting(alreadyVisited);
        }

        if (!layoutMode) {
            localStorage.setItem("layout_mode", "horizontal-mode-switch");
        } else {
            $(".right-bar .theme-layout-choice input:checkbox").prop('checked', false);
            $("#" + layoutMode).prop('checked', true);
            updateThemeSetting(layoutMode);
        }

        if (!collapseMode) {
            localStorage.setItem("collapse_mode", "");
        } else {
            $('body').toggleClass('sidebar-enable vertical-collpsed');
            updateThemeSetting(collapseMode);
        }
    }

    $("#mode-switch").on("change", function (e) {
        let theme = $(this).is(':checked') ? 'dark' : 'light'
        updateThemeSetting(theme);
        updateSettingsUser('layout_mode', theme);
    });

    $("#vertical-menu-btn").on("click", function (e) {
        var mode = $('body').hasClass('vertical-collpsed') ? 'vertical-collpsed' : '';
        updateThemeSetting(mode);

    });

    $("#vertical-mode-switch, #horizontal-mode-switch").on("change", function (e) {
        var layout = e.target.id === "horizontal-mode-switch" ? 'horizontal' : 'vertical'
        updateThemeSetting(e.target.id);
        updateSettingsUser('data_layout', layout);
    });

    $("#light-mode-switch, #dark-mode-switch, #rtl-mode-switch").on("change", function (e) {
        updateThemeSetting(e.target.id);
    });

}

function updateThemeSetting(id) {
    let cssB = $(`#${id}`).attr('data-bsStyle')
    let cssApp = $(`#${id}`).attr('data-appStyle')
    if (id === "light-mode-switch") {
        $("#dark-mode-switch").prop("checked", false);
        $("#bootstrap-style").attr('href', cssB);
        $("#app-style").attr('href', cssApp);
        localStorage.setItem("is_visited", "light-mode-switch");
    } else if (id === "dark-mode-switch") {
        $("#light-mode-switch").prop("checked", false);
        $("#bootstrap-style").attr('href', cssB);
        $("#app-style").attr('href', cssApp);
        localStorage.setItem("is_visited", "dark-mode-switch");
    }
}

function init() {
    initMetisMenu();
    initLeftMenuCollapse();
    initActiveMenu();
    initMenuItem();
    initMenuItemScroll();
    initRightSidebar();
    initDropdownMenu();
    initPreloader()
    initSettings();
}

init();

window.addEventListener('load', () => {
    $('body').removeAttr('style');
    $('#layout-wrapper').removeAttr('style');
});
