const request = require('request');
const fs = require('fs');
const URL = 'https://dou.ua/';
let str = '';
const links = []; 
let link = '';

request('https://dou.ua/', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.

  const getHTML = (HTMLBody) => {
    // Вырезаем кусок кода со всеми ссылками
    const startStr = HTMLBody.indexOf('<div class="b-footer-slider m-hide">');
    const endStr = HTMLBody.indexOf('<footer class="b-footer">');

    for (let i = startStr; i < endStr; i++) {
      str = `${str}${HTMLBody[i]}`
    } 
    // console.log(str);
  };

  getHTML(body);

  const cutLinks = (string) => {
    // Начало ссылки
    let linkStart = string.indexOf('https://s.dou.ua/img/');
    // Конец ссылки
    let linkEnd = string.indexOf(' 1.1x');
    // Новая строка
    let newString = string;
   
    // Пока находим ссылку в строке, продолжаем цикл
    while (linkStart > 0) {
      // Вырезаем первую ссылку
      link = newString.slice(linkStart, linkEnd);
      // Записываем в массив
      links.push(link);
      // Обновляем новую строку с места окончания первой ссылки которую мы вырезали
      newString = newString.slice(linkEnd + 1);
      // Начало следующей ссылки
      linkStart = newString.indexOf('https://s.dou.ua/img/');
      // Конец следующей ссылки
      linkEnd = newString.indexOf(' 1.1x');
    }
  }

  cutLinks(str);
  // Массив ссылок на фото
  console.log(links);
});


// Для начала тебе нужно получить информацию со старотовой страници доу, как только ты получишь HTML найди где начинаеться этот раздел с фотографиями, и затем отрежь весь лишний HTML код
// так у тебя будет чисто блок с нужной инфой
// затем сделай функцию котороя каждый раз будет нарезать ссылки на фоточки и пушит в массив полученную ссылку
// почему функцию, потому что через indexOf ты будешь получать первое совпадение в коде и как только ты его получил, этот код отрезаешь