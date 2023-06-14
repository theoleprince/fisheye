const data = await fetch('src/assets/data.json').then(data => data.json());
let tagsMenu = [];
let data_tags_by_filters = [];
let photographer;
let media;
let mainElt;
let totalLikes = 0;
let salaryPerDay = 0;
const urlParams = new URLSearchParams(window.location.search);
const monParametre = urlParams.get('parametre');
console.log(monParametre);

photographer = data.photographers.find(item => item.id == monParametre);
console.log(photographer);
media = data.media.filter(item => item.photographerId == monParametre);
console.log(media);
miseEnPlaceDePageDuPhotographe(photographer, media)

function miseEnPlaceDePageDuPhotographe(photographer, media) {
    // Mise en place de la structure html5

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
    const logoElt = document.createElement("img");
    logoElt.src = 'src/assets/images/fishoye.png';
    logoElt.setAttribute('role', 'logo');
    logoElt.setAttribute('aria-label', 'logo');
    logoElt.setAttribute('tabindex', '0');


    divContaineur.appendChild(logoElt);
    // creation du main
    mainElt = document.createElement("main");

    document.body.appendChild(headerElt);
    bannier();
    // creationDuFormulaireDeContact();
    contact();
    trierPar();
    document.body.appendChild(mainElt);
    const footer = document.createElement("footer");
    footer.setAttribute('class', 'footer');
    document.body.appendChild(footer);
    constructionDuContenuMain(photographer, media)



}

function bannier() {
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
    divBtnContact.appendChild(creationDuFormulaireDeContact());
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

function trierPar() {
    var select = 'Popularité';
    const divContaineurTrie = document.createElement("div");
    divContaineurTrie.setAttribute('class', 'containeur-trie');
    divContaineurTrie.setAttribute('role', 'filtre');
    divContaineurTrie.setAttribute('aria-label', ' contenu filtre des medias');
    divContaineurTrie.setAttribute('tabindex', '0');
    document.body.appendChild(divContaineurTrie);
    const libelleTrie = document.createElement("h4");
    libelleTrie.innerText = 'Trier par';
    divContaineurTrie.appendChild(libelleTrie);
    const divDropdown = document.createElement("div");
    divDropdown.setAttribute('class', 'dropdown');
    divDropdown.setAttribute('role', 'element-filtre');
    divDropdown.setAttribute('aria-label', ' element de filtre des medias');
    divDropdown.setAttribute('tabindex', '0');
    divContaineurTrie.appendChild(divDropdown);

    const divDropbtn = document.createElement("button");
    divDropbtn.setAttribute('class', 'dropbtn');



    const spanDropbtn = document.createElement("span");
    spanDropbtn.setAttribute('id', 'pre');
    spanDropbtn.innerText = 'Popularité';

    const iconBasDropbtn = document.createElement("i");
    iconBasDropbtn.setAttribute('class', 'fa fa-angle-down');

    divDropbtn.appendChild(spanDropbtn);
    divDropbtn.appendChild(iconBasDropbtn);

    const divDropdownContent = document.createElement("div");
    divDropdownContent.setAttribute('class', 'dropdown-content');

    const lienDate = document.createElement("a");
    lienDate.innerText = 'Date';
    lienDate.setAttribute('href', '#');
    lienDate.setAttribute('id', 'second');

    const lienTitre = document.createElement("a");
    lienTitre.innerText = 'Titre';
    lienTitre.setAttribute('href', '#');
    lienTitre.setAttribute('id', 'trois');
    divDropdownContent.appendChild(lienDate);
    divDropdownContent.appendChild(lienTitre);

    divDropdown.appendChild(divDropbtn);
    divDropdown.appendChild(divDropdownContent);

    trierPhotographe();

    divDropdown.onkeydown = function (event) {
        // Touche 'entrer'
        console.log(event)
        if (event.keyCode == 9) {
            divDropdownContent.style.display = "block";
        }
        if (event.keyCode == 27) {
            divDropdownContent.style.display = "none";
        }
    }

    divDropdownContent.onkeydown = function (event) {
        // Touche 'entrer'
        if (event.keyCode == 27) {
            divDropdownContent.style.display = "none";
        }
    }

}

function trierPhotographe() {
    let pre = document.querySelector('#pre').textContent;
    let second = document.querySelector('#second').textContent;
    let trois = document.querySelector('#trois').textContent;

    document.querySelector('#second').addEventListener("click", function (event) {
        document.querySelector('#second').innerHTML = pre;
        document.querySelector('#pre').innerHTML = second;

        pre = document.querySelector('#pre').textContent;
        second = document.querySelector('#second').textContent;
        trois = document.querySelector('#trois').textContent;
        filterByElemnt(pre);
    });

    document.querySelector('#trois').addEventListener("click", function (event) {
        document.querySelector('#trois').innerHTML = pre;
        document.querySelector('#pre').innerHTML = trois;

        pre = document.querySelector('#pre').textContent;
        second = document.querySelector('#second').textContent;
        trois = document.querySelector('#trois').textContent;
        filterByElemnt(pre);
    });
}

function filterByElemnt(element) {
    console.log(element)
    console.log(media)
    document.querySelector("main").innerHTML = "";
    totalLikes = 0;
    salaryPerDay = 0;
    if (element == 'Date') {
        const data = media.sort((a, b) => a.date > b.date);
        listeDesMedia(data);
    }

    if (element == 'Popularité') {
        const data = media.sort((a, b) => b.likes - a.likes);
        listeDesMedia(data);
    }

    if (element == 'Titre') {
        const data = media.sort((a, b) => a.title > b.title);
        listeDesMedia(data);
    }

}
function constructionDuContenuMain(photographer, media1) {
    listeDesMedia(media1);
    selectPhotographe();
}

function listeDesMedia(media) {
    const divContentMedia = document.createElement("div");
    divContentMedia.setAttribute('class', 'content_photo');
    mainElt.appendChild(divContentMedia);
    let trois = document.querySelector('#trois');
    let divDropdownContent = document.querySelector('.dropdown-content');
    divContentMedia.onkeydown = function (event) {
        // Touche 'entrer'
        divDropdownContent.style.display = "none";
    }
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
            // mediaElt.appendChild(lightboxForm());
            divMedia.appendChild(mediaElt);
        } else if (item.video) {
            const mediaElt = document.createElement("video");
            mediaElt.src = item.video;
            mediaElt.setAttribute('poster', 'src/assets/images/pay.png');
            mediaElt.setAttribute('aria-label', 'video de' + '' + item.title);
            mediaElt.setAttribute('tabindex', '0');
            mediaElt.setAttribute('class', 'media--photo');
            mediaElt.setAttribute('data-media-url', item.video);
            mediaElt.setAttribute('data-media-type', 'video');
            // mediaElt.appendChild(lightboxForm());
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
    lightbox();
}

function like(media) {
    const heart1 = '<i class="far fa-heart heart-start" aria-hidden="true"></i>';
    const heart2 = '<i class="fas fa-heart heart-end-hover" aria-hidden="true"></i>';
    document.querySelector('#heart' + media.id).addEventListener("click", function (event) {
        let like = document.querySelector('#like' + media.id).textContent;
        let heart = document.querySelector('#heart' + media.id).children[0].outerHTML;
        if (heart1 == heart) {
            document.querySelector('#heart' + media.id).innerHTML = '';
            document.querySelector('#heart' + media.id).innerHTML = heart2;
            document.querySelector('#like' + media.id).innerHTML = parseInt(like) + 1;
            totalLikes += 1;
            document.querySelector(".footer").innerHTML = "";
            buildStatistiquePhotographe(totalLikes, salaryPerDay)
        } else if (heart2 == heart) {
            document.querySelector('#heart' + media.id).innerHTML = '';
            document.querySelector('#heart' + media.id).innerHTML = heart1;
            document.querySelector('#like' + media.id).innerHTML = parseInt(like) - 1;
            totalLikes -= 1;
            document.querySelector(".footer").innerHTML = "";
            buildStatistiquePhotographe(totalLikes, salaryPerDay)
        }
    });
}

function ajouterDieseSurChaqueTag(data) {
    let tag = [];
    tag = data.map(item => `#${item}`);
    return tag;

}

function dispositionDuMenu(elt, dataMenu, style) {
    const ulElt = document.createElement("ul");
    // ulElt.setAttribute('class', 'containeur');
    elt.appendChild(ulElt);
    dataMenu.forEach(item => {
        const liElt = document.createElement("li");
        const lienElt = document.createElement("a");
        lienElt.setAttribute('class', style);
        lienElt.innerText = item;
        lienElt.setAttribute('aria-label', item);
        ulElt.appendChild(liElt);
        liElt.appendChild(lienElt);

    })
}

function tag_select(e, item) {
    const name = item.childNodes[0].nodeValue.split('#');
    console.log(name)
    if (data_tags_by_filters.includes(name[1])) {
        const index = data_tags_by_filters.indexOf(name[1]);
        console.log('index ', index);
        data_tags_by_filters.splice(index, 1);
        console.log(data_tags_by_filters)
        filterPhotographe(data_tags_by_filters)
        e.currentTarget.parentNode.style.backgroundColor = 'white';
        const parent = e.currentTarget.parentNode;
        parent.children[0].style.backgroundColor = 'white';
        parent.children[0].style.color = '#901C1C';
    } else {
        console.log('l\'element n\'existe pas');
        data_tags_by_filters.push(name[1]);
        console.log(data_tags_by_filters)
        filterPhotographe(data_tags_by_filters)
        console.log(e.currentTarget.parentNode.children[0])
        e.currentTarget.parentNode.style.backgroundColor = '#D3573C';
        const parent = e.currentTarget.parentNode;
        parent.children[0].style.backgroundColor = '#D3573C';
        parent.children[0].style.color = 'white';
    }
}


function selectPhotographe() {
    let boutonTrier;
    boutonTrier = (document.querySelectorAll('.menu__tag'));
    if (boutonTrier) {
        boutonTrier.forEach(item => {

            item.addEventListener("click", function (event) {
                console.log(event);
                tag_select(event, item);
            });
        });

    }

}

function filterPhotographe(data) {
    let photos = [];
    media.forEach(item => {
        if (data.every(element => item.tags.includes(element))) {
            photos.push(item)
        }
    })
    console.log(photos)
    totalLikes = 0;
    salaryPerDay = 0;
    document.querySelector("main").innerHTML = "";
    listeDesMedia(photos)
}

function buildStatistiquePhotographe(totalLikes, salaryPerDay) {
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

function creationDuFormulaireDeContact() {
    const contact = document.createElement("div");
    contact.innerHTML = `<div id="contactModal" aria-label='modal du contact' role='modal contact' class="modal">
    <div tabindex='0' class="modal-content" aria-label='formulaire de contact'>
      <span role='fermer' tabindex='0' class="close" aria-label='fermer'>&times;</span>
      <h2 tabindex='0'>Contactez-moi <br> ${photographer.name}</h2>
      <form id="contactForm">
        <label tabindex='0' for="name">Prénom</label><br>
        <input tabindex='0' aria-label='Entrez votre prenom' type="text" name="Prenom" id="Prenom" required><br><br>
        <label tabindex='0' for="name">Nom</label><br>
        <input tabindex='0' aria-label='Entrez votre nom' type="text" name="name" id="name" required><br><br>
        <label tabindex='0' for="email">Email</label><br>
        <input tabindex='0' aria-label='Entrez votre email' type="email" name="email" id="email" required><br><br>
        <label tabindex='0' for="message">Votre message</label><br>
        <textarea tabindex='0' aria-label='Entrez votre message' name="message" id="message" required></textarea><br><br>
        <button tabindex='0' type="submit" aria-label='envoyer'>Envoyer</button>
      </form>
    </div>
  </div>`

    return contact;

}

function contact() {
    // Récupérer le bouton pour ouvrir le modal
    var btnOpenModal = document.getElementById("btnOpenModal");

    // Récupérer le modal
    var modalContact = document.querySelector("#contactModal");

    // Récupérer le bouton pour fermer le modal
    var close = document.querySelector(".close");
    close.addEventListener("click", function (event) {
        console.log('event', event)
        if (event.target.className == 'close') {
            modalContact.style.display = "none";
            console.log('event', modalContact.style.display)
        }
    })
    // Lorsque l'utilisateur clique sur le bouton pour ouvrir le modal, afficher le modal
    btnOpenModal.onclick = function () {
        modalContact.style.display = "block";
    }

    // Envoyer les données du formulaire lorsque l'utilisateur clique sur le bouton de soumission
    var form = document.getElementById("contactForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
    });

    // quitter la modal esc
    modalContact.onkeydown = function (event) {
        console.log(event)
        if (event.keyCode == 27) {
            modalContact.style.display = "none";
        }
    }

    window.addEventListener("click", function (event) {
        if (event.target == modalContact) {
            modalContact.style.display = "none";
        }
    });
}



function lightboxForm() {
    const divlightbox = document.createElement("div");
    divlightbox.innerHTML = `<!-- Lightbox -->
    <div class="lightbox" tabindex='0' role="Lightbox" aria-label="contenu de la light-box">
  <div class="lightbox-content">
    <button tabindex='0' class="lightbox-close" aria-label="Fermer la lightbox">&times;</button>
    <div tabindex='0' class="lightbox-media"></div>
    <button tabindex='0' class="lightbox-prev">&lt;</button>
    <button tabindex='0' class="lightbox-next">&gt;</button>
  </div>
</div>`
    return divlightbox
}
function lightbox() {
    let currentMediaIndex = 0;
    // Find all media items
    let mediaItems = document.querySelectorAll(".media--photo");

    // Create an array of media indexes for easy navigation
    let mediaIndex = [];
    mediaItems.forEach((item, i) => {
        mediaIndex.push(i);
    });

    // Add click event listener to media items
    mediaItems.forEach((item, i) => {
        item.addEventListener("click", (event) => {
            openLightbox(i);
        });
    });

    // Add click event listeners to navigation buttons
    document.querySelector(".lightbox-prev").addEventListener("click", () => {
        prevMedia();
    });

    document.querySelector(".lightbox-next").addEventListener("click", (event) => {
        console.log(event)
        nextMedia();
    });

    // Function to open the lightbox and show the selected media
    function openLightbox(index) {
        // Set current index
        const type = mediaItems[index].getAttribute("data-media-type");
        currentMediaIndex = index;

        // Get the selected media item
        const currentMedia = media[index];
        
        // Create a media element depending on the type of media
        let mediaElement;
        if (type == 'img') {
            console.log(currentMedia)
            mediaElement = document.createElement("img");
            mediaElement.src = currentMedia.image;
            mediaElement.setAttribute('aria-label', currentMedia.title);
            mediaElement.setAttribute('tabindex', '0');
        } else if (type == 'video') {
            mediaElement = document.createElement("video");
            mediaElement.src = currentMedia.video;
            mediaElement.autoplay = true;
            mediaElement.setAttribute('aria-label', currentMedia.title);
            mediaElement.setAttribute('tabindex', '0');
            // mediaElement.controls = true;
        }

        // Add media element to lightbox
        const lightboxMedia = document.querySelector(".lightbox-media");
        lightboxMedia.innerHTML = "";
        lightboxMedia.setAttribute('aria-label', 'liker l\'image');
        lightboxMedia.setAttribute('tabindex', '0');
        lightboxMedia.appendChild(mediaElement);

        // Show lightbox
        document.querySelector(".lightbox").style.display = "block";
    }

    // Function to navigate to the previous media
    function prevMedia() {
        if (currentMediaIndex === 0) {
            currentMediaIndex = mediaIndex.length - 1;
        } else {
            currentMediaIndex--;
            console.log(currentMediaIndex)
        }

        openLightbox(mediaIndex[currentMediaIndex]);
    }

    // Function to navigate to the next media
    function nextMedia() {
        if (currentMediaIndex === mediaIndex.length - 1) {
            currentMediaIndex = 0;
        } else {
            currentMediaIndex++;
            console.log(currentMediaIndex)
        }

        openLightbox(mediaIndex[currentMediaIndex]);
    }

    // Function to close the lightbox
    document.querySelector(".lightbox-close").addEventListener("click", () => {
        document.querySelector(".lightbox").style.display = "none";
    });
}
