const burger = document.getElementById("burgerMenu");
const menuArea = document.querySelector(".menu_expand_area");

burger.addEventListener("click", (e) => {
    e.stopPropagation();

    const isOpen = burger.classList.toggle("openBurgerMenu");

    if (isOpen) {
        menuArea.classList.add("open");
        document.addEventListener("click", handleClickOutside);
    } else {
        closeMenu();
    }
});

function closeMenu() {
    burger.classList.remove("openBurgerMenu");
    menuArea.classList.remove("open");
    document.removeEventListener("click", handleClickOutside);
}

function handleClickOutside(e) {
    if (!menuArea.contains(e.target) && !burger.contains(e.target)) {
        closeMenu();
    }
}