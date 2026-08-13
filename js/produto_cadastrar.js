let resposta = document.getElementById('resposta')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const marca = document.getElementById('marca').value
    const preco = document.getElementById('preco').value

    const produto = {
        nome: nome,
        marca: marca,
        preco: parseFloat(preco)
    }

    fetch(`${API_URL}/produto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''
        if (dados.message) {
            resposta.innerHTML = `<p>${dados.message}</p>`
            if (!dados.message.includes('Erro') && !dados.message.includes('Obrigatórios')) {
                document.querySelector('form').reset()
            }
        }
    })
    .catch((err) => {
        console.error('Erro ao cadastrar produto', err)
        resposta.innerHTML = '<p>Erro ao tentar cadastrar o produto.</p>'
    })
})
