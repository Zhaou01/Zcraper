const axios = require("axios");
const cheerio = require("cheerio");
const Character = require("./models/character.model");

const urlBase = "https://one-piece.com/character/index.html?sort=desc&include_bounty_none=true&min=0&max=3&orgGroup=0&sortKey=new&page=";
const onePiece = "https://one-piece.com";

const populateDb = async () => {
  try {
    for (let i = 1; i <= 41; i++) {
      console.log(`\n--- 📄 PROCESANDO PÁGINA ${i} ---`);
      const { data } = await axios.get(urlBase + i);
      const $ = cheerio.load(data);

  
      const detailLinks = [];
      $(".p-character-list__item a").each((_, el) => {
        detailLinks.push(onePiece + $(el).attr("href"));
      });


      for (const link of detailLinks) {
        try {
          const detailRes = await axios.get(link);
          const $detail = cheerio.load(detailRes.data);

          const charData = {
            name: $detail(".p-character-detail__name").text().trim(),
            avatar: onePiece + $detail(".p-character-detail__img img").attr("src"),
            img: onePiece + $detail(".p-character-detail__body-img img").attr("src"),
          };

  
          const exists = await Character.findOne({ name: charData.name });

          if (!exists) {
            const newChar = new Character(charData);
            await newChar.save();
            console.log(`✨ Guardado: ${charData.name}`);
          } else {
            console.log(`⏩ Saltado (ya existe): ${charData.name}`);
          }

     
          await new Promise(r => setTimeout(r, 500));

        } catch (error) {
          console.log(`❌ Error procesando detalle ${link}:`, error.message);
        }
      }
    }
    console.log("\n✅ ¡Base de datos poblada con éxito!");
  } catch (err) {
    console.error("🔴 Error global en el scraper:", err);
  }
};

module.exports = populateDb;
