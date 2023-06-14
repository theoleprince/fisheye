import {ajouterDieseSurChaqueTag} from './ajouter-un-diese.js';
import {dispositionDuMenu} from './disposition-du-menu.js';

export function constructionDuContenuMain(data, mainElt) {
    console.log(data)
    const divContentPhoto = document.createElement("div");
    divContentPhoto.setAttribute('class', 'content_photo');
    mainElt.appendChild(divContentPhoto);
    data.forEach(item => {
        // Création d’une balise dédiée à un photographe
        const photographeElement = document.createElement("article");
        const lienPhotographe = document.createElement("a");
        const maNouvelleUrl = "detail-photographe.html?parametre=" + item.id;
        lienPhotographe.setAttribute('href', maNouvelleUrl);
        divContentPhoto.appendChild(photographeElement);
        photographeElement.appendChild(lienPhotographe);
        const imgArticle = document.createElement("img");
        // mainElt.setAttribute('role', 'contenu principal');
        lienPhotographe.setAttribute('tabindex', '0');
        lienPhotographe.setAttribute('aria-label', 'image de'+' '+item.name);
        imgArticle.src = item.image
        imgArticle.setAttribute('alt',  'image de'+' '+item.name);

        const nomPhotographe = document.createElement("h2");
        nomPhotographe.innerText = item.name;
        const paysEtVillePhotographe = document.createElement("h3");
        paysEtVillePhotographe.setAttribute('tabindex', '0');
        paysEtVillePhotographe.setAttribute('class', 'pays__ville');
        paysEtVillePhotographe.innerText = `${item.city},${item.country}`;
        const taglinePhotographe = document.createElement("p");
        taglinePhotographe      .setAttribute('tabindex', '0');
        taglinePhotographe.innerText = item.tagline;
        const prixPhotographe = document.createElement("p");
        prixPhotographe.setAttribute('class', 'prix__photo');
        prixPhotographe.innerText = item.price + '€';
        prixPhotographe.setAttribute('tabindex', '0');
        const tagsPhotographe = document.createElement("div");
        tagsPhotographe.setAttribute('class', 'disposition_tag');
        dispositionDuMenu(tagsPhotographe, ajouterDieseSurChaqueTag(item.tags), '')

        lienPhotographe.appendChild(imgArticle);
        lienPhotographe.appendChild(nomPhotographe);
        lienPhotographe.appendChild(paysEtVillePhotographe);
        lienPhotographe.appendChild(taglinePhotographe);
        lienPhotographe.appendChild(prixPhotographe);
        lienPhotographe.appendChild(tagsPhotographe);

    })



}