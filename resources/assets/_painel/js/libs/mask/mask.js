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