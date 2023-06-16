import { dispositionDuMenu } from './disposition-du-menu.js'
import { constructionDuContenuMain } from './construction-contenu-main.js'

export function miseEnPlaceDuSite(tagsMenu, data) {

    // Mise en place de la structure html5

    // creation du header
    const headerElt = document.createElement("header");
    headerElt.setAttribute('role', 'entête');
    headerElt.setAttribute('aria-label', 'en tete du site');
    headerElt.setAttribute('tabindex', '0');

    // contenu du header
    const divContaineur = document.createElement("div");
    divContaineur.setAttribute('class', 'containeur');

    headerElt.appendChild(divContaineur);
    // contenu de la div containeur
    const logoElt = document.createElement("img");
    logoElt.src = 'src/assets/images/fishoye.png';
    logoElt.setAttribute('alt', 'logo fishoye');
    logoElt.setAttribute('aria-label', 'logo fishoye');
    logoElt.setAttribute('tabindex', '0');

    const divMenu = document.createElement("div");
    divMenu.setAttribute('role', 'Navigation');
    divMenu.setAttribute('aria-label', 'Menu principal');
    dispositionDuMenu(divMenu, tagsMenu, 'menu__tag')
    divMenu.setAttribute('tabindex', '0');

    const titreSite = document.createElement("h1");
    titreSite.innerText = 'Nos photographes';
    titreSite.setAttribute('tabindex', '0');

    divContaineur.appendChild(logoElt);
    divContaineur.appendChild(divMenu);
    divContaineur.appendChild(titreSite);

    // creation du main
    const mainElt = document.createElement("main");
    mainElt.setAttribute('class', 'main');
    mainElt.setAttribute('role', 'contenu principal');
    mainElt.setAttribute('aria-label', 'contenu principal');
    // mainElt.setAttribute('tabindex', '0');
    // creation du footer
    const footerElt = document.createElement("footer");

    // rattacher les balise header, main et footer au body

    document.body.appendChild(headerElt);
    document.body.appendChild(mainElt);
    document.body.appendChild(footerElt);

    constructionDuContenuMain(data);

}