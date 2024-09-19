import { data } from './data.js';  

const container = document.getElementById('card-container');
const header = document.getElementById('header-categorias');

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
        <h1 class="titulo">${item.titulo}</h1>
        <p>${item.descricao}</p>
      </div>
    </div>`;
}


// Função para renderizar todos os cards
function renderCards(data) {
  const cards = data.map(createCard).join('');  // Gera todos os cards e junta como uma string
  container.innerHTML = cards;  // Adiciona todos os cards de uma vez ao DOM
}

// Função para criar o header com categorias únicas
function createHeaderCategorias(data) {
  // Extrai todas as categorias e remove duplicatas usando o Set
  const categoriasUnicas = [...new Set(data.flatMap(item => item.categorias))];

  // Cria o HTML do header com todas as categorias
  const categoriasHTML = categoriasUnicas.map(cat => `<button>${cat}</button>`).join('');
  header.innerHTML = categoriasHTML;
}

// Renderiza os cards e o header
renderCards(data);
createHeaderCategorias(data);

