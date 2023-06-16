import {miseEnPlaceDePageDuPhotographe} from './detail-photographe/mise-en-place-page-photographe.js';
const data = await fetch('src/assets/data.json').then(data => data.json());
let photographer;
let media;
const urlParams = new URLSearchParams(window.location.search);
const monParametre = urlParams.get('parametre');

photographer = data.photographers.find(item => item.id == monParametre);
media = data.media.filter(item => item.photographerId == monParametre);
miseEnPlaceDePageDuPhotographe(photographer, media);




