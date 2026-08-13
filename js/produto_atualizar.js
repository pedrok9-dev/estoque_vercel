let resposta = document.getElementById('resposta')
let btn_atualizar = document.getElementById('btn_atualizar')

btn_atualizar.addEventListener('click', (e) => {
    e.preventDefault()

    const codProduto = document.getElementById('codProduto').value
    const nome = document.getElementById('nome').value
    const marca = document.getElementById('marca').value
    const preco = document.getElementById('preco').value

    if (!codProduto) {
        resposta.innerHTML = '<p>Por favor, informe o Código do Produto!</p>'
        return
    }

    const produtoAtualizado = {
        nome: nome,
        marca: marca,
        preco: parseFloat(preco)
    }

    fetch(`${API_URL}/produto/${codProduto}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtoAtualizado)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''

        if (dados.message) {
            resposta.innerHTML = `<p>${dados.message}</p>`
            if (dados.dados) {
                let dadosArr = [dados.dados]
                resposta.innerHTML += `
                    <table>
                        ${criarThead()}
                        ${criarTbody(dadosArr)}
                    </table>
                `
            }
            document.querySelector('form').reset()
        }
    })
    .catch((err) => {
        console.error('Erro ao atualizar produto', err)
        resposta.innerHTML = '<p>Erro ao tentar atualizar o produto.</p>'
    })
})

function criarTbody(dados) {
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codProduto}</td>`
        corpo += `<td>${el.nome}</td>`
        corpo += `<td>${el.marca}</td>`
        corpo += `<td>${el.quantidade}</td>`
        corpo += `<td>R$ ${parseFloat(el.preco).toFixed(2)}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    return `
        <thead>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Marca</th>
                <th>Qtd. Estoque</th>
                <th>Preço</th>
            </tr>
        </thead>
    `
}