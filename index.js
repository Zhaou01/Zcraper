const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const dbConnection = require("./db");
const Character = require("./db");

const app = express();

const url = "https://one-piece.com/log/character.html?p=";

const articles = [];

const onePiece = "https://one-piece.com";

const charArr = [];

let char = {
  name: "",
  avatar: "",
  img: "",
};

const dataForScrap = async () => {
  for (let i = 1; i < 39; i++) {
    n = i;
    await axios(url + n)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        return $(".listArea > ul > li", html).each(function () {
          const asd = $(this).find("a").attr("href");
          const link = onePiece + asd;
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

    for (let i = 0; i < 3; i++) {
      await axios(filtro[i].link).then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        $(".thumbBox > p ", html).each(
          function () {
            const avatar = $(this).find("img").attr("src");
            char.avatar = onePiece + avatar;
          },
          $(".contDerail > p ", html).each(function () {
            const imagen = $(this).find("img").attr("src");
            const charName = filtro[i].link
              .split("/detail/")[1]
              .split(".html")[0];
            const charImg = onePiece + imagen;
            char.name = charName;
            char.img = charImg;
            $(".thumbBox > p ", html).each(function () {
              const avatar = $(this).find("img").attr("src");
              char.avatar = onePiece + avatar;
            }, charArr.push(char));
            console.log(char);
          })
        );
      });
    }
  };
  imgscrap();
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

app.listen(dbConnection);
