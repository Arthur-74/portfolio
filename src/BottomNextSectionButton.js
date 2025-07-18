//===================== FUNCTION ========================

const sections = Array.from(document.querySelectorAll("section"));
const scrollButton = document.getElementById("scrollButton");

scrollButton.addEventListener("click", () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    // Posição do meio da tela
    const centerY = scrollY + viewportHeight / 2;

    // Encontra a próxima seção abaixo do centro da tela
    const nextSection = sections.find(section => {
        const sectionTop = section.getBoundingClientRect().top + scrollY;
        return sectionTop > centerY + 10;
    });

    if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
        // Se não houver mais seções abaixo, volta para o topo
        sections[0].scrollIntoView({ behavior: "smooth" });
    }
});

//===================== ANIMATION ========================

const button = document.getElementById('scrollButton');
const icon = button.querySelector('.iconNext');
const footer = document.querySelector('footer');

function updateScrollButton() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const footerTop = footer.offsetTop;
    const buttonHeight = button.offsetHeight;

    const pageBottom = scrollY + viewportHeight;
    const distanceToFooter = footerTop - pageBottom;

    // 1. Rotaciona o ícone quando o botão estiver a 100px ou menos do footer
    const buttonBottom = button.getBoundingClientRect().bottom;
    const footerTopInView = footer.getBoundingClientRect().top;
    const distanceFromButtonToFooter = footerTopInView - buttonBottom;

    if (distanceFromButtonToFooter <= 100) { //valor minimo de distância para rotação
        icon.classList.add('rotate');
    } else {
        icon.classList.remove('rotate');
    }

    // 2. Transição de fixed → absolute
    if (distanceToFooter <= 20) {
        // Captura a posição real do botão na página antes da troca
        const buttonTopInPage = button.getBoundingClientRect().top + window.scrollY;

        if (button.style.position !== 'absolute') {
            button.style.position = 'absolute';
            button.style.top = `${buttonTopInPage}px`; // posição exata antes da troca
            button.style.bottom = 'auto';
            button.style.left = '50%';
            button.style.transform = 'translateX(-50%)';
        }
    } else {
        if (button.style.position !== 'fixed') {
            button.style.position = 'fixed';
            button.style.top = 'auto';
            button.style.bottom = '20px';
            button.style.left = '50%';
            button.style.transform = 'translateX(-50%)';
        }
    }
}

window.addEventListener('scroll', updateScrollButton);
window.addEventListener('resize', updateScrollButton);
window.addEventListener('load', updateScrollButton);