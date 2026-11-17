const dicionarioColunas = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "G",
  8: "H",
};

// Monta o tabuleiro em lista
let tabuleiro = [];
for (let i = 0; i < 8; i++) {
  let linha = [];
  for (let j = 0; j < 8; j++) {
    linha.push(null);
  }
  tabuleiro.push(linha);
}

// Peças brancas
tabuleiro[6].forEach((item, indice) => {
  tabuleiro[6][indice] = { tipo: "peao", cor: "branca", texto: "♙" };
});
tabuleiro[7].forEach((item, indice) => {
  if ([0, 7].includes(indice)) {
    tabuleiro[7][indice] = { tipo: "torre", cor: "branca", texto: "♖" };
  }
  if ([1, 6].includes(indice)) {
    tabuleiro[7][indice] = { tipo: "cavalo", cor: "branca", texto: "♘" };
  }
  if ([2, 5].includes(indice)) {
    tabuleiro[7][indice] = { tipo: "bispo", cor: "branca", texto: "♗" };
  }
  if (indice === 3) {
    tabuleiro[7][indice] = { tipo: "rainha", cor: "branca", texto: "♕" };
  }
  if (indice === 4) {
    tabuleiro[7][indice] = { tipo: "rei", cor: "branca", texto: "♔" };
  }
});

// Peças pretas
tabuleiro[1].forEach((item, indice) => {
  tabuleiro[1][indice] = { tipo: "peao", cor: "preta", texto: "♟" };
});
tabuleiro[0].forEach((item, indice) => {
  if ([0, 7].includes(indice)) {
    tabuleiro[0][indice] = { tipo: "torre", cor: "preta", texto: "♜" };
  }
  if ([1, 6].includes(indice)) {
    tabuleiro[0][indice] = { tipo: "cavalo", cor: "preta", texto: "♞" };
  }
  if ([2, 5].includes(indice)) {
    tabuleiro[0][indice] = { tipo: "bispo", cor: "preta", texto: "♝" };
  }
  if (indice === 3) {
    tabuleiro[0][indice] = { tipo: "rainha", cor: "preta", texto: "♛" };
  }
  if (indice === 4) {
    tabuleiro[0][indice] = { tipo: "rei", cor: "preta", texto: "♚" };
  }
});

// Monta o tabuleiro em html
const board = document.getElementById("tabuleiro");
for (let linha = 8; linha >= 1; linha--) {
  for (let coluna = 1; coluna <= 8; coluna++) {
    let casa = document.createElement("div");
    casa.id = dicionarioColunas[coluna] + linha;

    let linha_indice = document.createElement("div");
    let coluna_indice = document.createElement("div");

    if (linha == 1) {
      coluna_indice.textContent = dicionarioColunas[coluna];
      coluna_indice.classList.add("coluna");
      casa.appendChild(coluna_indice);
    }
    if (coluna == 1) {
      linha_indice.textContent = linha;
      linha_indice.classList.add("linha");
      casa.appendChild(linha_indice);
    }
    if (
      (coluna % 2 != 0 && linha % 2 == 0) ||
      (coluna % 2 == 0 && linha % 2 != 0)
    ) {
      casa.classList.add("casa-branca");
    } else {
      casa.classList.add("casa-preta");
    }
    board.appendChild(casa);

    // Adiciona as peças da lista no tabuleiro
    let peca = document.createElement("div");
    if (tabuleiro[(linha - 8) * -1][coluna - 1] !== null) {
      peca_lista = tabuleiro[(linha - 8) * -1][coluna - 1];
      peca.id = peca_lista.tipo + "-" + peca_lista.cor + "-" + coluna;
      if (peca_lista.cor === "branca") {
        peca.classList.add("peca-branca");
      } else {
        peca.classList.add("peca-preta");
      }
      peca.textContent = peca_lista.texto;
      peca.draggable = true;
      peca.classList.add("peca");
      casa.appendChild(peca);
    }
  }
}

const pecas = document.querySelectorAll(".peca");
const casas = document.querySelectorAll(".casa-preta, .casa-branca");

pecas.forEach((peca) => {
  peca.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("text/plain", event.target.id);
  });
});

casas.forEach((casa) => {
  casa.addEventListener("dragover", function (event) {
    event.preventDefault();
  });
});

casas.forEach((casa) => {
  casa.addEventListener("drop", function (event) {
    event.preventDefault();

    const id_peca = event.dataTransfer.getData("text/plain");
    const peca_arrastada = document.getElementById(id_peca);

    let casa_alvo = event.target;
    if (casa_alvo.classList.contains("peca")) {
      casa_alvo = casa_alvo.parentElement;
    }

    casa_alvo.appendChild(peca_arrastada);
  });
});
