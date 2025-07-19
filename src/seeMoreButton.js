const cardsPorPagina = 6;
let inicio = 0;

function atualizarCards() {
    const cards = document.querySelectorAll('.project_card_model');
    const btn = document.getElementById('seeAllDisplay');

    // Mostrar os próximos cards
    for (let i = inicio; i < inicio + cardsPorPagina && i < cards.length; i++) {
        cards[i].style.display = 'block';
    }

    inicio += cardsPorPagina;

    // Verificar se ainda há mais cards ocultos
    if (inicio >= cards.length) {
        btn.style.display = 'none';
    } else {
        btn.style.display = 'flex';
    }
}

// Inicializa exibindo os primeiros 6
document.addEventListener('DOMContentLoaded', () => {
    atualizarCards();
});

// Ao clicar no botão
function mostrarMaisCards() {
    atualizarCards();
}