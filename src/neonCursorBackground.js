const cursor = document.querySelector(".cursor-neon");

document.addEventListener("mousemove", (e) => {
    const rect = cursor.getBoundingClientRect();
    const offsetX = rect.width / 2;
    const offsetY = rect.height / 2;

    cursor.style.transform = `translate(${e.clientX - offsetX}px, ${e.clientY - offsetY}px)`;
});

function copiarEmail() {
    const copy = document.querySelector('.copyContactEmail');
    const copied = document.querySelector('.copiedContactEmail');

    // Move visualmente os elementos
    copy.style.top = '-70px';
    copied.style.top = '0';

    // Altera valor de transparência
    copy.style.opacity = '0'
    copied.style.opacity = '1'

    // Copia o texto
    const email = "arthurwilliamfb@hotmail.com";
    navigator.clipboard.writeText(email).catch(err => console.error('Erro ao copiar:', err));

    // Volta ao estado original após 0.5s
    setTimeout(() => {
        copy.style.top = '0';
        copy.style.opacity = '1'
        copied.style.opacity = '0'
        copied.style.top = '70px';
    }, 1200);
}