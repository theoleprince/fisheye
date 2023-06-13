export function ajouterDieseSurChaqueTag(data) {
    let tag = [];
    tag = data.map(item => `#${item}`);
    return tag;

}