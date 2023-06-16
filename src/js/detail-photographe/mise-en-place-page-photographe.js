import {contact} from './contact.js';
import {bannier} from './bannier.js';
import {trierPar} from './trier-media.js';
import {selectPhotographe} from '../select-photographe.js';
import {listeDesMedia} from './lister-media.js';

export function miseEnPlaceDePageDuPhotographe(photographer, media) {
    // creation du header
    const headerElt = document.createElement("header");
    headerElt.setAttribute('role', 'banner');
    headerElt.setAttribute('aria-label', 'contenu de l\'en tete');
    headerElt.setAttribute('tabindex', '0');

    // contenu du header
    const divContaineur = document.createElement("div");
    divContaineur.setAttribute('class', 'containeur');
    headerElt.appendChild(divContaineur);
    // contenu de la div containeur
    const titreH1 = document.createElement("h1");
    const logoElt = document.createElement("img");
    logoElt.src = 'src/assets/images/fishoye.png';
    logoElt.setAttribute('role', 'logo');
    logoElt.setAttribute('aria-label', 'logo');
    logoElt.setAttribute('tabindex', '0');


    titreH1.appendChild(logoElt);
    divContaineur.appendChild(titreH1);
    // creation du main
    const mainElt = document.createElement("main");
    mainElt.setAttribute('class', 'main');

    document.body.appendChild(headerElt);
    bannier(photographer);
    contact();
    trierPar(media);
    document.body.appendChild(mainElt);
    const footer = document.createElement("footer");
    footer.setAttribute('class', 'footer');
    document.body.appendChild(footer);
    selectPhotographe(media);
    listeDesMedia(media);
    
}