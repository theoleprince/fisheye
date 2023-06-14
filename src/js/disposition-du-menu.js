export function dispositionDuMenu(elt, dataMenu, style) {
    const ulElt = document.createElement("ul");
    ulElt.setAttribute('class', 'containeur');
    ulElt.setAttribute('role', 'contenu filtre');
    elt.appendChild(ulElt);
    dataMenu.forEach(item => {
        const liElt = document.createElement("li");
        const lienElt = document.createElement("a");
        lienElt.setAttribute('aria-label', item);
        lienElt.setAttribute('class', style);
        lienElt.setAttribute('tabindex', '0');
        lienElt.innerText = item;
        ulElt.appendChild(liElt);
        liElt.appendChild(lienElt);

    })
}