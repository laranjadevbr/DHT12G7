import {
    timer,
    byLine,
    mask,
    getTag,
} from './main.js';

getTag('body')[0]['classList'].add('bg-light');

getTag('footer')[0]['style']['paddingBottom'] = '1.5rem';

byLine('by-line', 'laranja dev br', 'far820320@gmail.com', '+55 (11) 9 4005 8153');

timer('timer', 1);

mask('cnpj');