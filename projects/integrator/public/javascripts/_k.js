import {
    styleObject,
    styleFunction,
} from './main.js';

let URLPath = 'https://api.thecatapi.com/v1/images/search?category_ids=4';
URLPath += '&limit=10';
fetch(URLPath).then((result) => {
    return result.json();
}).then((result) => {
    result.forEach((element) => {
        let styleList = [
            ['backgroundImage', 'url(' + element['url'] + ')'],
            ['backgroundSize', 'cover'],
            ['display', 'inline-block'],
            ['height', 3 * 200 / 4 + 'px'],
            ['width', 200 + 'px'],
        ];
        styleFunction(new styleObject(styleList), styleList, 'section', 'div');        
    });
});

// let getContent = async () => {
//     try {
//         const index = await fetch('http://localhost/3333/').json();
//         // console.log(index);
//         let output = '';
//         for (let i of index) { output += `<li>${ i['name'] }</li>`; }
//         window.document.querySelector('main').innerHTML = output;
//     } catch (error) { console.error(error); }
// };

// getContent();