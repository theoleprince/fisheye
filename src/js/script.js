
import {main} from './main.js';

const data = await fetch('../../assets/data.json').then(data => data.json());

main(data);