import { data } from './data.js';  

const container = document.getElementById('elemento-pai');
const header = document.getElementById('header');

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

// Função para criar o header com categorias únicas, incluindo "All"
function createHeaderCategorias(data) {
  // Extrai todas as categorias e remove duplicatas usando o Set
  const categoriasUnicas = ['Todas', ...new Set(data.flatMap(item => item.categorias))];

  // Cria o HTML do header com todas as categorias
  const categoriasHTML = categoriasUnicas
  .map(cat => `<button class="categoria-btn">${cat}</button>`).join('');
  header.innerHTML = categoriasHTML;
 // Adiciona evento de clique aos botões para filtrar
  const buttons = document.querySelectorAll('.categoria-btn');
// laço de repeticao, cada botao receberá uma funcao
  buttons.forEach((button, index) => {
    // Adiciona a classe "active" ao primeiro botão
    if (index === 0) {
      button.classList.add('active');
    }
    // adicionar o evento de click ao botao
    button.addEventListener('click', () => {
      const categoriaSelecionada = button.textContent;
      // funcao para realizar o filtro
      filtrarPorCategoria(categoriaSelecionada);
      // Remover a classe "active" de todos os botões
      buttons.forEach(btn => btn.classList.remove('active'));
      // Adicionar a classe "active" ao botão clicado
      button.classList.add('active');
    });
  });
}

// Função para filtrar os cards por categoria
function filtrarPorCategoria(categoria) {
  if (categoria === 'Todas') {
    renderCards(data);  // Se a categoria for "All", renderiza todos os cards
  } else {
    const filteredData = data.filter(item => item.categorias.includes(categoria));
    renderCards(filteredData);  // Renderiza apenas os cards filtrados
  }
}

// Renderiza os cards e o header
renderCards(data);
createHeaderCategorias(data);