import {dispositionDuMenu} from '../disposition-du-menu.js';
import {ajouterDieseSurChaqueTag} from '../ajouter-un-diese.js'
import {creationDuFormulaireDeContact} from './contact.js';
export function bannier(photographer) {
    // contenu du bannier
    const divContaineur = document.createElement("div");
    divContaineur.setAttribute('class', 'containeur');
    divContaineur.setAttribute('role', 'contenu bannier');
    divContaineur.setAttribute('aria-label', 'contenu de la bannier');
    document.body.appendChild(divContaineur);

    const divInfoProfile = document.createElement("div");
    divInfoProfile.setAttribute('class', 'info-profile');
    divInfoProfile.setAttribute('role', 'info-profile');
    divInfoProfile.setAttribute('aria-label', 'info profile');
    // divInfoProfile.setAttribute('tabindex', '0');

    const nomPhotographe = document.createElement("h2");
    nomPhotographe.innerText = photographer.name;
    nomPhotographe.setAttribute('tabindex', '0');
    const paysEtVillePhotographe = document.createElement("h3");
    paysEtVillePhotographe.setAttribute('class', 'pays__ville');
    paysEtVillePhotographe.innerText = `${photographer.city},${photographer.country}`;
    paysEtVillePhotographe.setAttribute('tabindex', '0');
    const taglinePhotographe = document.createElement("p");
    taglinePhotographe.innerText = photographer.tagline;
    taglinePhotographe.setAttribute('tabindex', '0');
    const prixPhotographe = document.createElement("p");
    const tagsPhotographe = document.createElement("div");
    tagsPhotographe.setAttribute('class', 'disposition_tag');
    tagsPhotographe.setAttribute('aria-label', 'tags Photographe');
    tagsPhotographe.setAttribute('tabindex', '0');
    dispositionDuMenu(tagsPhotographe, ajouterDieseSurChaqueTag(photographer.tags), 'menu__tag')

    const divBtnContact = document.createElement("div");
    divInfoProfile.setAttribute('role', 'bouton');
    divInfoProfile.setAttribute('aria-label', 'Contactez-moi');
    divBtnContact.setAttribute('class', 'btn-contact');
    divBtnContact.setAttribute('id', 'btnOpenModal');
    divBtnContact.innerText = 'Contactez-moi';
    divBtnContact.setAttribute('tabindex', '0');

    const divProfile = document.createElement("div");
    divProfile.setAttribute('class', 'profile');
    divProfile.setAttribute('role', 'profile');
    divProfile.setAttribute('aria-label', photographer.tagline);
    const profileElt = document.createElement("img");
    profileElt.setAttribute('tabindex', '0');
    profileElt.setAttribute('alt', photographer.name);
    profileElt.src = photographer.image;
    divBtnContact.appendChild(creationDuFormulaireDeContact(photographer));
    divContaineur.appendChild(divInfoProfile);
    divContaineur.appendChild(divBtnContact);
    divContaineur.appendChild(divProfile);

    divProfile.appendChild(profileElt);
    divInfoProfile.appendChild(nomPhotographe);
    divInfoProfile.appendChild(paysEtVillePhotographe);
    divInfoProfile.appendChild(taglinePhotographe);
    divInfoProfile.appendChild(prixPhotographe);
    divInfoProfile.appendChild(tagsPhotographe);
}