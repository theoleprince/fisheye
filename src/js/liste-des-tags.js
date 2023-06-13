import {ajouterDieseSurChaqueTag} from './ajouter-un-diese.js'

export function listeDesTags(data) {
    console.log(data);
    let tags = [];
    data.forEach(item => item.tags.forEach(item => {
        if (!tags.includes(item)) {
            tags.push(item);
        }
    }))
    const res = ajouterDieseSurChaqueTag(tags)
    return res;
}