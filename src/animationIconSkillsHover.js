const classToIconId = {
    'html-img': 'icon_html',
    'css-img': 'icon_css',
    'js-img': 'icon_js',
    'ts-img': 'icon_ts',

    'react-img': 'icon_react',
    'next-img': 'icon_next',
    'tailwind-img': 'icon_tailwind',
    'sass-img': 'icon_sass',

    'figma-img': 'icon_figma',
    'xd-img': 'icon_xd',
    'ps-img': 'icon_ps',
    'lr-img': 'icon_lr',

    'git-img': 'icon_git',
    'github-img': 'icon_github',
    'vscode-img': 'icon_vscode',
    'vite-img': 'icon_vite',
    'npm-img': 'icon_npm',

    'responsive-img': 'icon_responsive',
    'acess-img': 'icon_acess',
    'uiux-img': 'icon_uiux'

};

// Seleciona todas as divs com a classe 'name'
document.querySelectorAll('.name').forEach(nameDiv => {
    // Verifica qual classe específica está presente
    for (const className in classToIconId) {
        if (nameDiv.classList.contains(className)) {
            const iconId = classToIconId[className];
            const iconElement = document.getElementById(iconId);

            if (iconElement) {
                // Aplica eventos de hover
                nameDiv.addEventListener('mouseenter', () => {
                    iconElement.style.top = '0px';
                    iconElement.style.transition = 'top 0.3s ease, transform 0.3s ease';
                    iconElement.style.transform = 'rotate(0deg)';

                });

                nameDiv.addEventListener('mouseleave', () => {
                    iconElement.style.top = '-52px';
                    iconElement.style.transform = 'rotate(10deg)';
                });
            }

            break; // já encontrou a classe correspondente
        }
    }
});