import { data } from './data.js';

const container = document.getElementById('elemento-pai');
const header = document.getElementById('header');

// Array para armazenar os favoritos
let favoritos = [];

// Função para criar o HTML de um card
function createCard(item) {
  const isFavorited = favoritos.includes(item.titulo) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos';
  
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
        <button onclick="toggleFavorito('${item.titulo}')">${isFavorited}</button>
      </div>
    </div>`;
}

// Função para renderizar todos os cards
function renderCards(data) {
  const cards = data.map(createCard).join('');
  container.innerHTML = cards;
}

// Função para alternar favoritos
window.toggleFavorito = function(titulo) {
  if (favoritos.includes(titulo)) {
    favoritos = favoritos.filter(fav => fav !== titulo);
  } else {
    favoritos.push(titulo);
  }
  renderCards(data);
  renderFavoritos();
};

// Função para criar o header com categorias únicas, incluindo "All"
function createHeaderCategorias(data) {
  const categoriasUnicas = ['Todas', ...new Set(data.flatMap(item => item.categorias))];
  const categoriasHTML = categoriasUnicas
    .map(cat => `<button class="categoria-btn">${cat}</button>`).join('');
  header.innerHTML = categoriasHTML;

  const buttons = document.querySelectorAll('.categoria-btn');
  buttons.forEach((button, index) => {
    if (index === 0) button.classList.add('active');
    button.addEventListener('click', () => {
      const categoriaSelecionada = button.textContent;
      filtrarPorCategoria(categoriaSelecionada);
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
}

// Função para filtrar os cards por categoria
function filtrarPorCategoria(categoria) {
  if (categoria === 'Todas') {
    renderCards(data);
  } else {
    const filteredData = data.filter(item => item.categorias.includes(categoria));
    renderCards(filteredData);
  }
}

// Função para exibir os favoritos
function renderFavoritos() {
  const favoritosContainer = document.getElementById('favoritos');
  favoritosContainer.innerHTML = favoritos.length
    ? `<h2>Favoritos:</h2><ul>${favoritos.map(fav => `<li>${fav}</li>`).join('')}</ul>`
    : `<h2>Favoritos:</h2><p>Nenhum favorito ainda.</p>`;
}

// Renderiza os cards, o header e os favoritos
renderCards(data);
createHeaderCategorias(data);
renderFavoritos();