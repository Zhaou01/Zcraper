const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const nodemon = require("nodemon");

const app = express();

const url = "https://one-piece.com/log/character.html?p=";

const articles = [];

const dataForScrap = async () => {
  for (var i = 1; i < 39; i++) {
    n = i;
    // console.log(url + n);

    await axios(url + n)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const Onepiece = "https://one-piece.com";
        return $(".listArea > ul > li", html).each(function () {
          const asd = $(this).find("a").attr("href");
          const link = Onepiece + asd;
          // console.log(link);
          articles.push({
            link,
          });
        });
        // console.log(articles.length);
        // console.log(articles[articles.length-1]);
      })
      .catch((err) => console.log(err));
  }
};
dataForScrap().finally(() => {
  console.log(articles);
});
// console.log(articles);
console.log(articles.length);

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
