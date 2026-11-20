let produtos = [
    { id: 1, nome: "Luminária de mesa", preco: 49.99, categoria: "Iluminação", imagem: "./assets/luminaria.webp" },
    { id: 2, nome: "Vaso para plantas", preco: 14.99, categoria: "Decoração", imagem: "./assets/vaso.webp" },
    { id: 3, nome: "Cadeira de escritório", preco: 499.99, categoria: "Móveis", imagem: "./assets/cadeira.webp" },
];

const titulo = document.querySelector("#titulo");
const campoTitulo = document.querySelector("#novo-titulo");
const botaoAlterar = document.querySelector("#alterar-titulo");
const colecao = document.querySelector("#colecao");
const botaoDestaque = document.querySelector("#alternar-destaque");

const mensagemTitulo = document.querySelector("#mensagem-titulo");
const campoNome = document.querySelector("#nome");
const contadorNome = document.querySelector("#contador-nome");

botaoAlterar.addEventListener("click", () => {
    const novoTitulo = campoTitulo.value.trim();

    campoTitulo.classList.remove("invalido");
    campoTitulo.removeAttribute("aria-invalid", "true");
    mensagemTitulo.classList.remove("erro");

    if (novoTitulo === "") {
        campoTitulo.classList.add("invalido");
        campoTitulo.setAttribute("aria-invalid", "true");

        mensagemTitulo.textContent = "Digite um titulo para a coleção.";
        mensagemTitulo.classList.add("erro");
        return;
    }

    titulo.textContent = campoTitulo.value;
    mensagemTitulo.textContent = "Titulo atualizado.";
    mensagemTitulo.classList.add("sucesso");
});

botaoDestaque.addEventListener("click", () => {
    colecao.classList.toggle("destaque");

    if (colecao.classList.contains("destaque")) {
        botaoDestaque.textContent = "Retirar destaque ↗";
    } else {
        botaoDestaque.textContent = "Destacar coleção ↗";
    }
})

campoNome.addEventListener("input", () => {
    contadorNome.textContent = campoNome.value.length + " caracteres";
})

// ################################# ETAPA 2 ##################################

const lista = document.querySelector("#lista-produtos");
const quantidade = document.querySelector("#quantidade");
const ordem = document.querySelector("#ordem");
const totalElemento = document.querySelector("#total");
const avisoVazio = document.querySelector("#aviso-vazio");

function renderizarProdutos() {
    aplicarOrdenacao();
    lista.textContent = "";

    produtos.forEach((produto) => {
        const item = document.createElement("li");
        const imagem = document.createElement("img");
        const categoria = document.createElement("p");
        const nome = document.createElement("h3");
        const preco = document.createElement("p");
        const acoes = document.createElement("div");
        const botao = document.createElement("button");

        item.classList.add("produto");
        item.dataset.id = produto.id;

        imagem.classList.add("produto-imagem");
        imagem.src = produto.imagem;
        imagem.alt = produto.mome;

        categoria.classList.add("produto-categoria");
        categoria.textContent = produto.categoria;

        nome.classList.add("produto-nome");
        nome.textContent = produto.nome;

        preco.classList.add("produto-preco");
        preco.textContent = formatarPreco(produto.preco);

        acoes.classList.add("produto-acoes");

        botao.classList.add("acao-produto");
        botao.type = "button";
        botao.dataset.id = produto.id;
        botao.textContent = "Remover";
        botao.addEventListener("click", removerProduto);

        item.appendChild(imagem);
        item.appendChild(categoria);
        item.appendChild(nome);
        item.appendChild(preco);

        acoes.appendChild(botao);

        item.appendChild(acoes);

        lista.appendChild(item);
    })

    const total = produtos.reduce((acumulador, produto) => {
        return acumulador + produto.preco;
    }, 0);

    quantidade.textContent = produtos.length;
    totalElemento.textContent = formatarPreco(total);
    avisoVazio.hidden = produtos.length > 0;
}

function formatarPreco(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}

function removerProduto(evento) {
    const id = Number(evento.currentTarget.dataset.id);

    produtos = produtos.filter((produto) => {
        return produto.id !== id;
    })

    renderizarProdutos();
}

function aplicarOrdenacao() {
    if(ordem.value === "crescente") {
        produtos.sort((a, b) => a.preco - b.preco);
    }
    else if(ordem.value === "decrescente") {
        produtos.sort((a, b) => b.preco - a.preco); 
    }
    else if(ordem.value === "nome") {
        produtos.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR")); 
    }
    else {
        produtos.sort((a, b) => a.id - b.id);
    }
}

ordem.addEventListener("change", renderizarProdutos);

renderizarProdutos();



/* 1. Ignore titulos vazios ou compostos por espaços. Mostre erro em mensagemTitulo e marque o campo com a classe invalido.
2. Depois de uma correção válida, retire a marca e mostre Títulos atualizado..
3. Acrescente o cantador no nome e altere o texto do botão entre Destacar coleção e Retirar destaque.

Pistas: Trim, classlist.contains, campoNome.value.length e addEventListener("input", () => {}) */

//=================================================================

/* Gerar os cartões pelo array de produtos, remover pelo ID, ordenar e atualizar */

//=================================================================

/* Atualize a quantidade total de peças.
Some os preços com reduce e mostre o resultado com formatarPreco.
Mostre o aviso de vazio apenas quando não houver produtos. */