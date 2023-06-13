import {tag_select} from './selectionner-tag.js';
export function selectPhotographe(photographers) {
    let boutonTrier;
    let data = [];
    boutonTrier = (document.querySelectorAll('.menu__tag'));
    if (boutonTrier) {
        boutonTrier.forEach(item => {

            item.addEventListener("click", function (event) {
                console.log(item);
                data = tag_select(event, item, photographers, data);
                // tag_select(event, item, photographers, data);
            });
        });

    }

    
}