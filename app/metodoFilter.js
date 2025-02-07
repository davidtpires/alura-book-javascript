const botoes = document.querySelectorAll('.btn');

botoes.forEach(btn => btn.addEventListener('click', filtrarLivros))

function filtrarLivros() {
    const elementoBtn = document.getElementById(this.id)
    const categoria = elementoBtn.value
    console.log(categoria)
    let livrosFiltrados = categoria == 'disponivel' ? filtrarPorDisponibilidade() : FiltrarPorCategoria(categoria)
    // console.table(livrosFiltrados)
    exibirOsLivrosNaTela(livrosFiltrados);
    if (categoria == 'disponivel') {
        exibirValorTotalDosLivrosDisponiveisNaTela()
    }
}

function FiltrarPorCategoria(categoria) {
    return livros.filter(livro => livro.categoria == categoria);
}

function filtrarPorDisponibilidade() {
    return livros.filter(livro => livro.quantidade > 0);
}

function exibirValorTotalDosLivrosDisponiveisNaTela() {
    elementoComValorTotalDeLivrosDisponiveis.innerHTML = `
        <div class="livros__disponiveis">
        <p>Todos os livros disponíveis por R$ <span id="valor">199,00</span></p>
        </div>
    `
}