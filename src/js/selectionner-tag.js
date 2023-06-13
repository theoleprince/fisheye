import {filterPhotographe} from './filter-photographe.js';

export function tag_select(e, item, photographers, data) {
    const name = item.childNodes[0].nodeValue.split('#');
    console.log(name)
    const data_tags_by_filters = Array.from(data);
    console.log(data_tags_by_filters)
    if (data_tags_by_filters.includes(name[1])) {
        const index = data_tags_by_filters.indexOf(name[1]);
        data_tags_by_filters.splice(index, 1);
        filterPhotographe(data_tags_by_filters, photographers)
        e.currentTarget.parentNode.style.backgroundColor = 'white';
        const parent = e.currentTarget.parentNode;
        parent.children[0].style.backgroundColor = 'white';
        parent.children[0].style.color = '#901C1C';
    } else {
        data_tags_by_filters.push(name[1]);
        filterPhotographe(data_tags_by_filters, photographers)
        e.currentTarget.parentNode.style.backgroundColor = '#D3573C';
        const parent = e.currentTarget.parentNode;
        parent.children[0].style.backgroundColor = '#D3573C';
        parent.children[0].style.color = 'white';
    }
    return data_tags_by_filters;
}
