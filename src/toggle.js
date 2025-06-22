function toggleMode() {
    const app = document.getElementById('app');
    const toggle = document.getElementById('toggle');
    const toggle2 = document.getElementById('toggle2');

    // Alterna classes
    app.classList.toggle('dark-theme');
    toggle.classList.toggle('dark');
    toggle2.classList.toggle('dark');

    // Salva no localStorage
    const isDark = app.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Aplica o tema salvo ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme');
    const app = document.getElementById('app');
    const toggle = document.getElementById('toggle');

    if (theme === 'dark') {
        app.classList.add('dark-theme');
        toggle.classList.add('dark');
        toggle2.classList.toggle('dark');
    }
});
