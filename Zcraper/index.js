const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const nodemon = require("nodemon");
const dbConnection = require("./db");

const app = express();

const url = "https://one-piece.com/log/character.html?p=";

const articles = [];

const Onepiece = "https://one-piece.com";

const CharObj = [];

const char = {
  name: "",
  avatar: "",
  img: "",
};

const dataForScrap = async () => {
  for (var i = 1; i < 39; i++) {
    n = i;
    await axios(url + n)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        return $(".listArea > ul > li", html).each(function () {
          const asd = $(this).find("a").attr("href");
          const link = Onepiece + asd;
          articles.push({
            link,
          });
        });
      })
      .catch((err) => console.log(err));
  }
};
dataForScrap().finally(() => {
  const imgscrap = async () => {
    const ir = "link";
    const filtro = articles.filter((link) => link !== ir);

    for (var k = 0; k < filtro.length; k++) {
      await axios(filtro[k].link).then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        $(".thumbBox > p ", html).each(
          function () {
            const avatar = $(this).find("img").attr("src");
            char.avatar = Onepiece + avatar;
          },
          $(".contDerail > p ", html).each(function () {
            const imagen = $(this).find("img").attr("src");
            const charName = filtro[k].link
              .split("/detail/")[1]
              .split(".html")[0];
            const charImg = Onepiece + imagen;
            console.log(charName);
            console.log(charImg);
            char.name = charName;
            char.img = charImg;
            $(".thumbBox > p ", html).each(function () {
              const avatar = $(this).find("img").attr("src");
              char.avatar = Onepiece + avatar;
            }, CharObj.push(char));
            console.log(char);
          })
        );
      });
    }
  };
  imgscrap();
});
console.log(articles.length);

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

app.listen(dbConnection);
