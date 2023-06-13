import {constructionDuContenuMain} from './construction-contenu-main.js';

export function filterPhotographe(data, item) {
    console.log(item);
    let photos = [];
    let photographers =  Array.from(item)
    photographers.forEach(item => {
        if (data.every(element => item.tags.includes(element))) {
            photos.push(item)
        }
    })
    console.log(photos)
    document.querySelector("main").innerHTML = "";
    const mainElt = document.querySelector(".main");
    constructionDuContenuMain(photos, mainElt)
}