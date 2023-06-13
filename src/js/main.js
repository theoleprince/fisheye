
import {listeDesTags} from './liste-des-tags.js';
import {miseEnPlaceDuSite} from './mise-en-place-index.js';
import {selectPhotographe} from './select-photographe.js';

export function main(data) {
    const tagsMenu = listeDesTags(data.photographers);
    miseEnPlaceDuSite(tagsMenu, data.photographers);
    selectPhotographe(data.photographers)
}
