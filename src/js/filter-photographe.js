import {constructionDuContenuMain} from './construction-contenu-main.js';

export function filterPhotographe(data, itemPhotographes) {
    console.log(itemPhotographes);
    let photos = [];
    let photographers =  Array.from(itemPhotographes)
    photographers.forEach(item => {
        if (data.every(element => item.tags.includes(element))) {
            photos.push(item)
        }
    })
    console.log(photos)
    document.querySelector("main").innerHTML = "";
    constructionDuContenuMain(photos)
}