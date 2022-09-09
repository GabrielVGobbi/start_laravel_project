const selectAxOption = (request) => {
    return {
        valueField: 'id',
        labelField: 'name',
        preload: true,
        firstUrl: function (query) {
            return `${request}` + encodeURIComponent(query) + '&pageSize=30';
        },
        load: function (query, callback) {
            var url = `${request}?search=` + encodeURIComponent(query) + '&pageSize=30';
            fetch(url)
                .then(response => response.json())
                .then(response => {
                    callback(response.data);
                }).catch(() => {
                    callback();
                });
        },
    }
}

const newSelect = (item) => {
    let createIn = item.dataset.create ? true : false;
    let request = item.dataset.request;
    let options = {
        persist: false,
        createOnBlur: false,
        create: createIn,
        openOnFocus: true,
    }

    if (request) {
        options = Object.assign(options, selectAxOption(request))
    }

    new TomSelect(item, options);
}

document.querySelectorAll('.t-select').forEach(item => {
    newSelect(item)
})