"use strict";

const TableBs = [].slice.call(document.querySelectorAll('[data-bs-toggle="table"]'));

const TableOptions = {}

const getFilter = () => {
    let filter = {};
    $.each($('.search-input'), function () {
        if ($(this).attr('name') != undefined) {
            let id = $(this).attr('id')
            let value = JSON.parse(localStorage.getItem(id));
            filter[$(this).attr('name')] = value ?? $(this).val();
        }
    });
    return filter;
}

if (TableBs) {
    TableBs.forEach((tableEl) => {
        const tableId = tableEl.dataset.table;
        const table = $(tableEl);
        const divTableResponsive = tableEl.closest('div .table-responsive');
        divTableResponsive.insertAdjacentHTML('afterbegin', preload(`table.bs.${tableId}`));

        let order = table.attr('order');
        let filter = getFilter();

        let paginate = table.attr('data-paginate') != undefined ? false : true;
        let eExport = table.attr('data-export') != undefined ? false : true;
        let showColumns = table.attr('data-collums') != undefined ? false : true;
        let showFooter = table.attr('data-show-footer') != undefined ? false : true;
        let click = table.attr('data-click');

        $(tableEl).bootstrapTable(({
            locale: 'pt-BR',
            method: 'get',
            url: `${base_url_api}/p/tables/${tableId}`,
            dataType: 'json',
            classes: 'table table-hover table-striped',
            pageList: "[10, 25, 50, 100]",
            cookie: true,
            cache: true,
            search: true,
            showExport: eExport,
            showColumns: showColumns,
            idField: 'id',
            toolbar: '#toolbar',
            buttonsClass: 'dark',
            showColumnsToggleAll: true,
            pageSize: 20,
            cookieIdTable: tableId,
            queryParamsType: 'all',
            striped: true,
            pagination: paginate,
            sidePagination: "server",
            pageNumber: 1,
            showFooter: showFooter,
            queryParams: function (p) {
                return {
                    sort: p.sortName ?? order,
                    order: p.sortOrder,
                    search: p.searchText,
                    page: p.pageNumber,
                    pageSize: paginate ? p.pageSize : 'all',
                    filter: filter ?? {}
                };
            },
            responseHandler: function (res) {
                return {
                    total: res.meta ? res.meta.total : null,
                    rows: res.data
                };
            },
            onClickCell: function (field, value, row, $element) {
                if (click == 'false') {
                    return;
                }
                if (field != 'statusButton') {
                    window.location.href = `${i_url}/${row.id}`
                }
            },
            onLoadSuccess: function () {
                document.getElementById(`preload-table.bs.${tableId}`).remove();
                document.getElementById(`table.${tableId}`).classList.remove('d-none');
            },
        }));
    })
}

