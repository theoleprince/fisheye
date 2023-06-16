import {listeDesMedia} from './lister-media.js';

export function tag_select(e, item, media) {
    const name = item.childNodes[0].nodeValue.split('#');
    console.log(name)
    if (data_tags_by_filters.includes(name[1])) {
        const index = data_tags_by_filters.indexOf(name[1]);
        console.log('index ', index);
        data_tags_by_filters.splice(index, 1);
        console.log(data_tags_by_filters)
        filterPhotographe(data_tags_by_filters, media)
        e.currentTarget.parentNode.style.backgroundColor = 'white';
        const parent = e.currentTarget.parentNode;
        parent.children[0].style.backgroundColor = 'white';
        parent.children[0].style.color = '#901C1C';
    } else {
        console.log('l\'element n\'existe pas');
        data_tags_by_filters.push(name[1]);
        console.log(data_tags_by_filters)
        filterPhotographe(data_tags_by_filters, media)
        console.log(e.currentTarget.parentNode.children[0])
        e.currentTarget.parentNode.style.backgroundColor = '#D3573C';
        const parent = e.currentTarget.parentNode;
        parent.children[0].style.backgroundColor = '#D3573C';
        parent.children[0].style.color = 'white';
    }
}


export function selectPhotographe(media) {
    let boutonTrier;
    boutonTrier = (document.querySelectorAll('.menu__tag'));
    if (boutonTrier) {
        boutonTrier.forEach(item => {

            item.addEventListener("click", function (event) {
                console.log(event);
                tag_select(event, item, media);
            });
        });

    }

}

export function filterPhotographe(data, media) {
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