let resposta = document.getElementById('resposta')
let btn_consultar = document.getElementById('btn_consultar')

btn_consultar.addEventListener('click', (e) => {
    e.preventDefault()

    const codProduto = document.getElementById('codProduto').value

    if (!codProduto) {
        resposta.innerHTML = '<p>Por favor, informe o Código do Produto!</p>'
        return
    }

    fetch(`${API_URL}/produto/${codProduto}`)
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''

        if (!dados || dados.message) {
            resposta.innerHTML = `<p>${dados.message || 'Produto não encontrado!'}</p>`
            return
        }

        let dadosArr = Array.isArray(dados) ? dados : [dados]

        resposta.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dadosArr)}
            </table>
        `
    })
    .catch((err) => {
        console.error('Erro ao consultar o produto', err)
        resposta.innerHTML = '<p>Erro ao consultar o produto.</p>'
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
