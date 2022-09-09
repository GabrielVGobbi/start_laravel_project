$('.date').mask('00/00/0000');

$('.money').mask('000.000.000.000.000,00', { reverse: true });

$('.rg').mask('00000000-0');

$('.cnpj').mask('00.000.000/0000-00');

$('.date_time').mask('00/00/0000 00:00');

$('.game_type').mask('0v0');

$('.phone').mask('(00)  0000-0000');

var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
    spOptions = {
        onKeyPress: function (val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };

$('.sp_celphones').mask(SPMaskBehavior, spOptions);