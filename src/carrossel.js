// Limite máximo de itens exibidos no carrossel
const MAX_ITEMS = 5;

// Elementos principais do carrossel
const container = document.querySelector('.carousel-container');       // Contêiner visível do carrossel
const track = document.querySelector('.carousel-track');               // Faixa que desliza os cards
const allItems = Array.from(document.querySelectorAll('.project_card_model')); // Todos os itens disponíveis

// Seleciona apenas os primeiros MAX_ITEMS
const items = allItems.slice(0, MAX_ITEMS);

// Atualiza a DOM com apenas os itens permitidos
track.innerHTML = ''; // Limpa o conteúdo atual da faixa
items.forEach(item => track.appendChild(item)); // Adiciona os itens permitidos

const nextBtn = document.querySelector('.carousel-next');              // Botão de avançar
const prevBtn = document.querySelector('.carousel-prev');              // Botão de voltar
const dotsContainer = document.querySelector('.carousel-dots');       // Container dos pontos de navegação

// Variáveis de controle
let currentIndex = 0;
let isDragging = false;
let isClick = true;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let slideWidth = 0;
let slidesVisible = getSlidesVisible();
let totalSlides = items.length;
let totalDots = 0;
let dots = [];
const clickThreshold = 5;

// Inicializa o carrossel
initCarousel();

// Atualiza configurações em resize
window.addEventListener('resize', () => {
    slidesVisible = getSlidesVisible();
    updateDimensions();
    createDots();
    goToSlide(currentIndex);
});

// Retorna o número de slides visíveis com base na variável CSS
function getSlidesVisible() {
    return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--slides-visible')) || 1;
}

// Atualiza a largura de cada slide
function updateDimensions() {
    slideWidth = container.offsetWidth / slidesVisible;
}

// Inicializa o carrossel
function initCarousel() {
    updateDimensions();
    createDots();
    attachEvents();
    goToSlide(0);
    attachLinkProtection();
}

// Cria os dots de navegação
function createDots() {
    dotsContainer.innerHTML = '';
    totalDots = totalSlides - slidesVisible + 1;
    if (totalDots < 1) totalDots = 1;
    dots = [];

    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');

        dot.innerHTML = i === 0
            ? '<i class="fa-solid fa-circle-dot"></i>'
            : '<i class="fa-solid fa-circle"></i>';

        dot.addEventListener('click', () => goToSlide(i));

        dotsContainer.appendChild(dot);
        dots.push(dot);
    }
}

// Atualiza os ícones dos dots
function updateDots(index) {
    dots.forEach((dot, i) => {
        dot.innerHTML = i === index
            ? '<i class="fa-solid fa-circle-dot"></i>'
            : '<i class="fa-solid fa-circle"></i>';
    });
}

// Define a posição da faixa de itens
function setSliderPosition() {
    track.style.transform = `translateX(${currentTranslate}px)`;
}

// Vai para um slide específico
function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, totalSlides - slidesVisible));
    prevTranslate = -slideWidth * currentIndex;
    currentTranslate = prevTranslate;
    track.style.transition = 'transform 0.4s ease';

    requestAnimationFrame(() => {
        setSliderPosition();
        updateDots(currentIndex);
    });
}

// Início do arrasto
function startDrag(e) {
    isDragging = true;
    isClick = true;
    startX = getPositionX(e);
    container.style.cursor = 'grabbing';
    track.style.transition = 'none';
    animationID = requestAnimationFrame(animation);
}

// Durante o arrasto
function drag(e) {
    if (!isDragging) return;
    const currentX = getPositionX(e);
    const diff = currentX - startX;

    if (Math.abs(diff) > clickThreshold) {
        isClick = false;
    }

    const maxTranslate = 0;
    const minTranslate = -slideWidth * (totalSlides - slidesVisible);
    let nextTranslate = prevTranslate + diff;

    if (nextTranslate > maxTranslate) {
        nextTranslate = maxTranslate + (nextTranslate - maxTranslate) / 3;
    }
    if (nextTranslate < minTranslate) {
        nextTranslate = minTranslate + (nextTranslate - minTranslate) / 3;
    }

    currentTranslate = nextTranslate;
}

// Final do arrasto
function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);
    container.style.cursor = 'grab';

    let movedIndex = -currentTranslate / slideWidth;
    currentIndex = Math.round(movedIndex);

    currentIndex = Math.max(0, Math.min(currentIndex, totalSlides - slidesVisible));
    goToSlide(currentIndex);
}

// Pega a posição X do clique ou toque
function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

// Animação contínua enquanto arrasta
function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

// Adiciona os eventos de mouse/touch/botões
function attachEvents() {
    container.addEventListener('mousedown', startDrag);
    container.addEventListener('mousemove', drag);
    container.addEventListener('mouseup', endDrag);
    container.addEventListener('mouseleave', endDrag);

    container.addEventListener('touchstart', startDrag);
    container.addEventListener('touchmove', drag);
    container.addEventListener('touchend', endDrag);

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSlides - slidesVisible) goToSlide(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) goToSlide(currentIndex - 1);
    });
}

// Impede que links <a> sejam clicados ao arrastar
function attachLinkProtection() {
    track.querySelectorAll('a').forEach(link => {
        link.setAttribute('draggable', 'false');

        link.addEventListener('click', function (e) {
            if (!isClick) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
        }, true);
    });
}
