(function () {

    "use strict";

    const selectAxOption = (request, placeholder) => {
        return {
            //minimumInputLength: 3,
            language: "pt-br",
            placeholder: placeholder != null ? placeholder : "Selecione",
            ajax: {
                url: `${request}`,
                dataType: 'json',
                delay: 500,
                data: function (term, page) {
                    return {
                        search: term.term
                    };
                },
                processResults: function (data, page) {
                    var myResults = [];
                    myResults.push({
                        'id': '',
                        'text': 'Selecione'
                    })
                    $.each(data.data, function (index, item) {
                        myResults.push({
                            'id': item.id,
                            'text': item.name,
                        });
                    });
                    return {
                        results: myResults
                    };
                },
                cache: true
            }
        }
    }

    $('.select2').each(function () {
        let multiple = $(this).attr('data-multiple') ? true : false;
        let close = multiple ? false : true;
        let inParent = $(this).attr('data-parent') ? $(this).attr('data-parent') : false
        let inRequest = $(this).attr('data-request') ? $(this).attr('data-request') : false

        let options = {
            width: '100%',
            closeOnSelect: close,
            language: {
                inputTooShort: function () {
                    return "Pelo menos 3 caracteres para pesquisar";
                },
                formatNoMatches: function () {
                    return "Pesquisa não encontrada";
                }
            },
            escapeMarkup: function (m) {
                return m;
            }
        }

        if (inRequest != false) {
            options = Object.assign(options, selectAxOption(inRequest, $(this).attr('placeholder')))
        }

        if (inParent != false) {
            options = Object.assign(options, {
                dropdownParent: $(`${inParent} `),
            })
        }

        $(this).select2(options)
    })


})();
