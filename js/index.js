const request = require('request');
const fs = require('fs');
const URL = 'https://dou.ua/';
let str = '';


request('https://dou.ua/', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.

  const getHTML = (HTMLBody) => {
    const startStr = HTMLBody.indexOf('<div class="b-footer-slider m-hide">');
    const endStr = HTMLBody.indexOf('<footer class="b-footer">');

    for (let i = startStr; i < endStr; i++) {
      str = `${str}${HTMLBody[i]}`
    } 
    console.log(str);
  };
  getHTML(body);
});

// Для начала тебе нужно получить информацию со старотовой страници доу, как только ты получишь HTML найди где начинаеться этот раздел с фотографиями, и затем отрежь весь лишний HTML код
// так у тебя будет чисто блок с нужной инфой
// затем сделай функцию котороя каждый раз будет нарезать ссылки на фоточки и пушит в массив полученную ссылку
// почему функцию, потому что через indexOf ты будешь получать первое совпадение в коде и как только ты его получил, этот код отрезаешь