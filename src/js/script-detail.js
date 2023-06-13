const data = await fetch('assets/data.json').then(data => data.json());
let tagsMenu = [];
let data_tags_by_filters = [];
let photographer;
let media;
let mainElt;
const urlParams = new URLSearchParams(window.location.search);
const monParametre = urlParams.get('parametre');
console.log(monParametre);

photographer = data.photographers.find(item => item.id == monParametre);
console.log(photographer);
media = data.media.filter(item => item.photographerId == monParametre);
console.log(media);
miseEnPlaceDePageDuPhotographe(photographer, media)
// if (data) {
//     data.then(data => {
//         // récupérer la valeur d'un paramètre dans l'URL
//         const urlParams = new URLSearchParams(window.location.search);
//         const monParametre = urlParams.get('parametre');
//         console.log(monParametre);

//         photographer = data.photographers.find(item => item.id == monParametre);
//         console.log(photographer);
//         media = data.media.filter(item => item.photographerId == monParametre);
//         console.log(media);
//         miseEnPlaceDePageDuPhotographe(photographer, media)
//     })
// }

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
    logoElt.src = '../../assets/images/fishoye.png';
    logoElt.setAttribute('role', 'logo');
    logoElt.setAttribute('aria-label', 'logo');
    logoElt.setAttribute('tabindex', '0');


    divContaineur.appendChild(logoElt);
    // creation du main
    mainElt = document.createElement("main");
    // mainElt.setAttribute('role', 'contenu principal');
    // mainElt.setAttribute('aria-label', 'contenu principal');
    // mainElt.setAttribute('tabindex', '0');

    document.body.appendChild(headerElt);
    bannier();
    trierPar();
    document.body.appendChild(mainElt);

    constructionDuContenuMain(photographer, media)
}

function bannier() {
    // contenu du bannier
    const divContaineur = document.createElement("div");
    divContaineur.setAttribute('class', 'containeur');
    divContaineur.setAttribute('role', 'contenu bannier');
    divContaineur.setAttribute('aria-label', 'contenu de la bannier');
    // divContaineur.setAttribute('tabindex', '0');
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
    //  prixPhotographe.setAttribute('class', 'prix__photo');
    //  prixPhotographe.innerText = photographer.price + '€';
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
    if(element == 'Date') {
        const data = media.sort((a, b) => a.date > b.date);
        listeDesMedia(data);
    }

    if(element == 'Popularité') {
        const data = media.sort((a, b) => b.likes - a.likes);
        listeDesMedia(data);
    }

    if(element == 'Titre') {
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
    divContentMedia.appendChild(lightboxForm());
    media.forEach(item => {
        const divMedia = document.createElement("div");
        divMedia.setAttribute('class', 'media');
        divContentMedia.appendChild(divMedia);
        if (item.image) {
            const mediaElt = document.createElement("img");
            mediaElt.src = item.image;
            mediaElt.setAttribute('alt', item.title);
            mediaElt.setAttribute('aria-label', item.title);
            mediaElt.setAttribute('tabindex', '0');
            divMedia.appendChild(mediaElt);
        } else if (item.video) {
            const mediaElt = document.createElement("video");
            mediaElt.src = item.video;
            mediaElt.setAttribute('poster', '../../assets/images/pay.png');
            mediaElt.setAttribute('aria-label', item.title);
            mediaElt.setAttribute('tabindex', '0');
            divMedia.appendChild(mediaElt);
        }

        const desMediaElt = document.createElement("div");
        desMediaElt.setAttribute('class', 'des__media');
        divMedia.appendChild(desMediaElt);
        const nomMediaElt = document.createElement("h3");
        nomMediaElt.innerText = item.title;
        const divLikeEtCoeurElt = document.createElement("div");
        desMediaElt.appendChild(nomMediaElt);
        desMediaElt.appendChild(divLikeEtCoeurElt);
        const likesMediaElt = document.createElement("span");
        likesMediaElt.setAttribute('aria-label', `${item.likes} likes`);
        likesMediaElt.setAttribute('tabindex', '0');
        likesMediaElt.setAttribute('id', 'like'+item.id);
        likesMediaElt.innerText = item.likes;
        const iconCoeurMediaElt = document.createElement("span");
        iconCoeurMediaElt.setAttribute('id', 'heart'+item.id);
        iconCoeurMediaElt.innerHTML = `<i class="far fa-heart heart-start" aria-hidden="true"></i>`;
        iconCoeurMediaElt.setAttribute('aria-label', `like`);
        iconCoeurMediaElt.setAttribute('tabindex', '0');
        divLikeEtCoeurElt.appendChild(likesMediaElt);
        divLikeEtCoeurElt.appendChild(iconCoeurMediaElt);
        like(item);
    })
    creationDuFormulaireDeContact();
    contact();
    lightbox();
}

function like(media) {
    const heart1 =  '<i class="far fa-heart heart-start" aria-hidden="true"></i>';
    const heart2 =  '<i class="fas fa-heart heart-end-hover" aria-hidden="true"></i>';
    document.querySelector('#heart'+media.id).addEventListener("click", function (event) {
        let like = document.querySelector('#like'+media.id).textContent;
        let heart = document.querySelector('#heart'+media.id).children[0].outerHTML;
        if(heart1 == heart) {
            document.querySelector('#heart'+media.id).innerHTML = '';
            document.querySelector('#heart'+media.id).innerHTML = heart2;
            document.querySelector('#like'+media.id).innerHTML = parseInt(like) + 1;
        } else if(heart2 == heart){
            document.querySelector('#heart'+media.id).innerHTML = '';
            document.querySelector('#heart'+media.id).innerHTML = heart1;
            document.querySelector('#like'+media.id).innerHTML = parseInt(like) - 1;
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
    document.querySelector("main").innerHTML = "";
    listeDesMedia(photos)
}

function creationDuFormulaireDeContact() {
    const contact = document.createElement("div");
    contact.innerHTML = `<div id="contactModal" aria-label='modal' role='modal' class="modal">
    <div class="modal-content">
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
    var modal = document.getElementById("contactModal");

    // Récupérer le bouton pour fermer le modal
    var close = document.querySelector(".close");
    close.addEventListener("click", function (event) {
        console.log(event.target)
        console.log('event')
        modal.style.display = "none";
    })
    // Lorsque l'utilisateur clique sur le bouton pour ouvrir le modal, afficher le modal
    btnOpenModal.onclick = function () {
        modal.style.display = "block";
    }

    // Envoyer les données du formulaire lorsque l'utilisateur clique sur le bouton de soumission
    var form = document.getElementById("contactForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        // Envoyer les données du formulaire au serveur
        // Afficher un message de confirmation / d'erreur une fois la soumission terminée
    });

      // Navigation entre les images de la lightbox avec les touches du clavier
      document.onkeydown = function (event) {
        console.log(event)
        if (event.keyCode == 27) {
            modal.style.display = "none";
        }
    }

    // Ajouter un événement pour fermer la lightbox en cliquant en dehors de l'image
    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

function lightboxForm() {
    const divlightbox = document.createElement("div");
    divlightbox.innerHTML = `<!-- Lightbox -->
    <div id="myModal" aria-label='modal' role='modal' class="modal">
      <span tabindex='0' class="close-lightbox" aria-label='fermer' role='fermer'>&times;</span>
      <div class="modal-content-lightbox"> <img id="img01"> </div>
      <h3 tabindex='0' id="caption"></h3>
      <div tabindex='0' class="prev" aria-label='precedent' role='precedent'>&#10094;</div>
    <div tabindex='0' class="next"  aria-label='suivant' role='suivant'>&#10095;</div>
    </div>`
    return divlightbox
}
function lightbox() {

    // Récupérer les images
    var images = document.querySelectorAll(".media img");
    console.log(images);
    var totalImages = images.length;
    // Récupérer la lightbox
    var modal = document.getElementById("myModal");
    // Définir l'index de l'image actuellement affichée
    var currentIndex;

    // Récupérer l'élément pour afficher l'image de la lightbox
    var modalImg = document.getElementById("img01");

    // Récupérer l'élément pour afficher la légende de l'image
    var captionText = document.getElementById("caption");

    // Ajouter un événement à chaque image pour ouvrir la lightbox
    images.forEach(function (image, index) {
        image.addEventListener("click", function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            modalImg.tabindex = '0'; 
            modalImg.alt = this.alt;
            captionText.innerHTML = this.alt;
            currentIndex = index;
        });
        image.onkeydown = function (event) {
            // Touche 'entrer'
        if (event.keyCode == 13) {
            modal.style.display = "block";
            modalImg.src = this.src;
            modalImg.tabindex = '0'; 
            modalImg.alt = this.alt;
            captionText.innerHTML = this.alt;
            currentIndex = index;
        }
        }
        
    });

    var close = document.querySelector(".close-lightbox");
    close.addEventListener("click", function (event) {
        console.log(event.target)
        console.log('event')
        modal.style.display = "none";
    })
    // Récupérer les flèches de la lightbox
    var prev = document.querySelector(".prev");
    var next = document.querySelector(".next");

    // Ajouter des événements aux flèches pour passer à l'image précédente/suivante
    prev.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 < 0) ? images.length - 1 : currentIndex - 1;
        modalImg.src = images[currentIndex].src;
        modalImg.alt = images[currentIndex].alt;
        captionText.innerHTML = images[currentIndex].alt;
    });

    next.addEventListener("click", function () {
        currentIndex = (currentIndex + 1 >= images.length) ? 0 : currentIndex + 1;
        modalImg.src = images[currentIndex].src;
        modalImg.alt = images[currentIndex].alt;
        captionText.innerHTML = images[currentIndex].alt;
    });


    // Navigation entre les images de la lightbox avec les touches du clavier
    document.onkeydown = function (event) {
        console.log(event)
        // Fleche gauche
        if (event.keyCode == 37) {
            if (currentIndex === 0) {
                currentIndex = totalImages - 1;
            } else {
                currentIndex--;
            }
            document.querySelector('.modal-content-lightbox').src = images[currentIndex].src;
        }
        // Fleche droite
        else if (event.keyCode == 39) {
            if (currentIndex === totalImages - 1) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            document.querySelector('.modal-content-lightbox').src = images[currentIndex].src;
        }
        // Touche 'esc'KeyboardEvent.keyCode
        else if (event.keyCode == 27) {
            modal.style.display = "none";
        }
    }


    // Ajouter un événement pour fermer la lightbox en cliquant en dehors de l'image
    // window.addEventListener("click", function (event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // });
}
