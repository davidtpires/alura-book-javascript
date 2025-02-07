let livros = []
const endpointDaAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json'
getBuscarLivrosDaAPI()
const elementoParaInserirLivros = document.getElementById('livros')

async function getBuscarLivrosDaAPI() {
    const res = await fetch(endpointDaAPI)
    livros = await res.json()
    // console.table(livros)
    let livrosComDesconto = aplicarDesconto(livros)
    exibirOsLivrosNaTela(livrosComDesconto)
}

function aplicarDesconto(livro) {
    const desconto = 0.2
    livrosComDesconto = livros.map(livro => {
        return {...livro, preco: livro.preco - (livro.preco * desconto)}
    })

    return livrosComDesconto
}

function exibirOsLivrosNaTela(listaDeLivros) {
    elementoParaInserirLivros.innerHTML = ''
    listaDeLivros.forEach(livro => {
        let disponibilidade = livro.quantidade > 0 ? 'disponivel' : 'indisponivel'
        elementoParaInserirLivros.innerHTML += `
            <div class="livro">
                <img src="${livro.imagem}" alt="${livro.alt}" />
                <h2>${disponibilidade}</h2>
                <h2>${livro.titulo}</h2>
                <p>${livro.autor}</p>
                <p>R$${livro.preco.toFixed(2)}</p>
                <span>${livro.categoria}</span>
            </div>
        `
    });
}

const botoes = document.querySelectorAll('.btn')

botoes.forEach(btn => btn.addEventListener('click', filtrarLivros))

function filtrarLivros() {
    const elementoBtn = document.getElementById(this.id)
    const categoria = elementoBtn.value
    let livrosFiltrados = categoria == 'disponivel' ? livros.filter(livro => livro.quantidade > 0) : livros.filter(livro => livro.categoria == categoria)
    // console.table(livrosFiltrados)
    exibirOsLivrosNaTela(livrosFiltrados)
}

let btnOrdenarPorPreco = document.getElementById('btnOrdenarPorPreco')
btnOrdenarPorPreco.addEventListener('click', ordenarLivrosPorPreco)

function ordenarLivrosPorPreco(){
    let livrosOrdenados = livros.sort((a, b) => a.preco - b.preco)
    exibirOsLivrosNaTela(livrosOrdenados)
}