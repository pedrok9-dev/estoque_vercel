let resposta = document.getElementById('resposta')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const idUsuario = document.getElementById('idUsuario').value
    const idProduto = document.getElementById('idProduto').value
    const tipo = document.getElementById('tipo').value
    const qtdeMov = document.getElementById('qtdeMov').value
    const data = document.getElementById('data').value

    const movimento = {
        idUsuario: parseInt(idUsuario),
        idProduto: parseInt(idProduto),
        tipo: tipo,
        qtdeMov: parseInt(qtdeMov),
        data: data
    }

    fetch(`${API_URL}/estoque`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movimento)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''

        if (dados.message) {
            if (dados.message === 'Estoque atualizado!') {
                resposta.innerHTML = `<p style="color: white;">${dados.message} Nova Qtd no Estoque: ${dados.novaQtde}</p>`
                document.querySelector('form').reset()
            } else {
                resposta.innerHTML = `<p style="color: white;">${dados.message}</p>`
            }
        }
    })
    .catch((err) => {
        console.error('Erro ao registrar movimento de estoque', err)
        resposta.innerHTML = '<p>Erro ao tentar registrar o movimento de estoque.</p>'
    })
})