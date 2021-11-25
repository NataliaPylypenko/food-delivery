// Main js file
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import tabs from './modules/tabs';
import timer from './modules/timer';

import {openModal} from "./modules/modal";

window.addEventListener('DOMContentLoaded', () => {

    cards();
    forms('form');
    modal('[data-modal]', '.modal');
    tabs('.tabheader__item', '.tabheader__items', '.tabcontent', 'tabheader__item_active');
    timer('.timer', '2021-12-10');
})

