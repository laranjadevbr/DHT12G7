document.querySelector('#cep').addEventListener('blur', () => {
    fetch(`https://viacep.com.br/ws/${ cep['value'].replace('-', '') }/json`, {
        method : 'GET',
        mode : 'cors',
        cache : 'default',
    }).then((result) => {
        return result.json().then((result) => {
            for (const index in result) {
                if (document.querySelector('#' + index)) {
                    document.querySelector('#' + index)['value'] = result[index];
                }
            }
        }).catch((result) => {
            console.log(result);
        });
    }).catch((result) => {
        console.log(result);
    });
});