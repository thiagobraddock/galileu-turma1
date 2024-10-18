import { data } from './data.js';  

// para pegar o elemento na tela
const container = document.getElementById('elemento-pai');


// Função para criar o HTML de um card
function createCard(item) {
  return `
    <div class="card_ponto_turistico">
      <div class="card_imagem">
        <img src="${item.imagem}" alt="${item.titulo}">
      </div>
      <div class="card_detalhes">
        <div class="categorias">
          ${item.categorias.map(cat => `<span>${cat}</span>`).join('')}
        </div>
        <h1 class="titulo">${ item.titulo }</h1>
        <p>${item.descricao}</p>
      </div>
    </div>`;
}


container.innerHTML += createCard(data[0]);
container.innerHTML += createCard(data[1]);
