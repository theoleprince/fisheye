import {listeDesMedia} from './lister-media.js';
export function trierPar(media) {
    const divContaineurTrie = document.createElement("div");
    divContaineurTrie.setAttribute('class', 'containeur-trie');
    divContaineurTrie.setAttribute('role', 'filtre');
    divContaineurTrie.setAttribute('aria-label', ' contenu filtre des medias');
    divContaineurTrie.setAttribute('tabindex', '0');
    document.body.appendChild(divContaineurTrie);
    const libelleTrie = document.createElement("h3");
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

    trierPhotographe(media);

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

export function trierPhotographe(media) {
    let pre = document.querySelector('#pre').textContent;
    let second = document.querySelector('#second').textContent;
    let trois = document.querySelector('#trois').textContent;

    document.querySelector('#second').addEventListener("click", function (event) {
        document.querySelector('#second').innerHTML = pre;
        document.querySelector('#pre').innerHTML = second;

        pre = document.querySelector('#pre').textContent;
        second = document.querySelector('#second').textContent;
        trois = document.querySelector('#trois').textContent;
        filterByElemnt(pre, media);
    });

    document.querySelector('#trois').addEventListener("click", function (event) {
        document.querySelector('#trois').innerHTML = pre;
        document.querySelector('#pre').innerHTML = trois;

        pre = document.querySelector('#pre').textContent;
        second = document.querySelector('#second').textContent;
        trois = document.querySelector('#trois').textContent;
        filterByElemnt(pre, media);
    });
}

export function filterByElemnt(element, data) {
    console.log(element)
    const media = data;
    document.querySelector("main").innerHTML = "";
    // totalLikes = 0;
    // salaryPerDay = 0;
    if (element == 'Date') {
        const data = media.sort((a, b) => a.date > b.date);
        console.log(data)
        listeDesMedia(data);
    }

    if (element == 'Popularité') {
        const data = media.sort((a, b) => b.likes - a.likes);
        console.log(data)
        listeDesMedia(data);
    }

    if (element == 'Titre') {
        const data = media.sort((a, b) => a.title > b.title);
        console.log(data)
        listeDesMedia(data);
    }

}