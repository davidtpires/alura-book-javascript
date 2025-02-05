let livros = []
const endpointDaAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json'
getBuscarLivrosDaAPI()
const elementoParaInserirLivros = document.getElementById('livros')

async function getBuscarLivrosDaAPI() {
    const res = await fetch(endpointDaAPI)
    livros = await res.json()
    console.table(livros)
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
    listaDeLivros.forEach(livro => {
        elementoParaInserirLivros.innerHTML += `
            <div>
                <img src="${livro.imagem}" alt="${livro.alt}" />
                <h2>${livro.titulo}</h2>
                <p>${livro.autor}</p>
                <p>R$${livro.preco.toFixed(2)}</p>
                <span>${livro.categoria}</span>
            </div>
        `
    });
}