import {lightboxForm} from './lightbox.js';
import {lightbox} from './lightbox.js';

export function listeDesMedia(media) {
    const mainElt = document.querySelector(".main");
    const divContentMedia = document.createElement("div");
    divContentMedia.setAttribute('class', 'content_photo');
    mainElt.appendChild(divContentMedia);
    let trois = document.querySelector('#trois');
    let divDropdownContent = document.querySelector('.dropdown-content');
    divContentMedia.onkeydown = function (event) {
        // Touche 'entrer'
        divDropdownContent.style.display = "none";
    }
    let totalLikes = 0;
    let salaryPerDay = 0;
    media.forEach(item => {
        totalLikes += item.likes;
        salaryPerDay += item.price;
        const divMedia = document.createElement("div");
        divMedia.setAttribute('class', 'media');
        divContentMedia.appendChild(divMedia);
        if (item.image) {
            const mediaElt = document.createElement("img");
            mediaElt.src = item.image;
            mediaElt.setAttribute('alt', 'image de' + '' + item.title);
            mediaElt.setAttribute('aria-label', 'image de' + '' + item.title);
            mediaElt.setAttribute('tabindex', '0');
            mediaElt.setAttribute('class', 'media--photo');
            mediaElt.setAttribute('data-media-url', item.image);
            mediaElt.setAttribute('data-media-type', 'img');
            divMedia.appendChild(mediaElt);
        } else if (item.video) {
            const mediaElt = document.createElement("video");
            mediaElt.src = item.video;
            mediaElt.innerText = item.title;
            mediaElt.setAttribute('poster', 'src/assets/images/pay.png');
            mediaElt.setAttribute('aria-label', 'video de' + '' + item.title);
            mediaElt.setAttribute('tabindex', '0');
            mediaElt.setAttribute('class', 'media--photo');
            mediaElt.setAttribute('data-media-url', item.video);
            mediaElt.setAttribute('data-media-type', 'video');
            divMedia.appendChild(mediaElt);
        }
        divMedia.appendChild(lightboxForm());
        const desMediaElt = document.createElement("div");
        desMediaElt.setAttribute('class', 'des__media');
        divMedia.appendChild(desMediaElt);
        const nomMediaElt = document.createElement("h3");
        nomMediaElt.innerText = item.title;
        nomMediaElt.setAttribute('tabindex', '0');
        const divLikeEtCoeurElt = document.createElement("div");
        desMediaElt.appendChild(nomMediaElt);
        desMediaElt.appendChild(divLikeEtCoeurElt);
        const likesMediaElt = document.createElement("span");
        likesMediaElt.setAttribute('tabindex', '0');
        likesMediaElt.setAttribute('id', 'like' + item.id);
        likesMediaElt.innerText = item.likes;
        likesMediaElt.setAttribute('aria-label', item.likes + ' ' + 'likes');
        const iconCoeurMediaElt = document.createElement("span");
        iconCoeurMediaElt.setAttribute('id', 'heart' + item.id);
        iconCoeurMediaElt.innerHTML = `<i class="far fa-heart heart-start" aria-hidden="true"></i>`;
        iconCoeurMediaElt.setAttribute('aria-label', 'liker l\'image');
        iconCoeurMediaElt.setAttribute('tabindex', '0');
        divLikeEtCoeurElt.appendChild(likesMediaElt);
        divLikeEtCoeurElt.appendChild(iconCoeurMediaElt);
        like(item);
    })
    buildStatistiquePhotographe(totalLikes, salaryPerDay)
    lightbox(media);
}

export function like(media) {
    const heart1 = '<i class="far fa-heart heart-start" aria-hidden="true"></i>';
    const heart2 = '<i class="fas fa-heart heart-end-hover" aria-hidden="true"></i>';
    document.querySelector('#heart' + media.id).addEventListener("click", function (event) {
        let like = document.querySelector('#like' + media.id).textContent;
        let heart = document.querySelector('#heart' + media.id).children[0].outerHTML;
        if (heart1 == heart) {
            document.querySelector('#heart' + media.id).innerHTML = '';
            document.querySelector('#heart' + media.id).innerHTML = heart2;
            document.querySelector('#like' + media.id).innerHTML = parseInt(like) + 1;
            const totalLikes = parseInt(document.querySelector('.likesnombers').textContent) + 1;
            const salaryPerDay = parseInt(document.querySelector('.price').textContent);
            document.querySelector(".footer").innerHTML = "";
            buildStatistiquePhotographe(totalLikes, salaryPerDay);
        } else if (heart2 == heart) {
            document.querySelector('#heart' + media.id).innerHTML = '';
            document.querySelector('#heart' + media.id).innerHTML = heart1;
            document.querySelector('#like' + media.id).innerHTML = parseInt(like) - 1;
            const totalLikes = parseInt(document.querySelector('.likesnombers').textContent) - 1;
            const salaryPerDay = parseInt(document.querySelector('.price').textContent);
            document.querySelector(".footer").innerHTML = "";
            buildStatistiquePhotographe(totalLikes, salaryPerDay);
        }
    });
}

export function buildStatistiquePhotographe(totalLikes, salaryPerDay) {
    const stat = document.createElement('div');
    stat.classList.add("statistique");
    stat.innerHTML = ` <p class="likes">
                        <span class="likesnombers">${totalLikes}</span>
                        <span class="icon"><i class="fas fa-heart"></i></span>
                    </p>
                        <p class="price">
                        <span class="price">${salaryPerDay}<strong>€</strong> / jour</span>
                    </p>`;
    document.querySelector(".footer").appendChild(stat);
}
