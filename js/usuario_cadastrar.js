let resposta = document.getElementById('resposta')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const usuario = {
        nome: nome,
        email: email,
        senha: senha
    }

    fetch(`${API_URL}/usuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''
        resposta.innerHTML += `<p>${dados.message}</p>`
        if (!dados.message.includes('Erro') && !dados.message.includes('Obrigatórios')) {
            document.querySelector('form').reset()
        }
    })
    .catch((err) => {
        console.error('Erro ao cadastrar o usuário', err)
        resposta.innerHTML = '<p>Erro ao tentar cadastrar o usuário.</p>'
    })
})