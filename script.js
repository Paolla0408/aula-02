const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const contador = document.getElementById("contador");
const vazia = document.getElementById("vazia");

const produtos = [];

function exibirProdutos() {
    listaProdutos.innerHTML = "";

    produtos.forEach(function(produto, indice) {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco.toFixed(2).replace(".", ",")}</td>
            <td>${produto.quantidade}</td>
            <td>
                <button class="btn-remover" data-indice="${indice}">
                    Remover
                </button>
            </td>
        `;

        listaProdutos.appendChild(linha);
    });

    contador.textContent =
        produtos.length === 1
            ? "1 produto cadastrado"
            : `${produtos.length} produtos cadastrados`;

    vazia.style.display = produtos.length === 0 ? "block" : "none";
}

formProduto.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const preco = Number(document.getElementById("preco").value);
    const quantidade = Number(document.getElementById("quantidade").value);

    if (!nome || !preco || preco <= 0 || !quantidade || quantidade <= 0) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    produtos.push({
        nome: nome,
        preco: preco,
        quantidade: quantidade
    });

    formProduto.reset();
    exibirProdutos();
});

listaProdutos.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-remover")) {
        const indice = Number(event.target.dataset.indice);

        produtos.splice(indice, 1);

        exibirProdutos();
    }
});

exibirProdutos();
