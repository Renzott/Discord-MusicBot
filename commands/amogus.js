const { MessageEmbed } = require("discord.js");
const cheerio = require('cheerio');
const { default: fetch } = require("node-fetch");

const urlsData = [
  {
    url: "https://knowyourmeme.com/memes/among-us/photos/page/@?nsfw=true",
    pages: 120
  }, {
    url: "https://knowyourmeme.com/memes/amogus/photos/page/@?nsfw=true",
    pages: 6
  }, {
    url: "https://knowyourmeme.com/memes/among-us-eyes/photos/page/@?nsfw=true",
    pages: 3
  }, {
    url: "https://knowyourmeme.com/memes/among-drip/photos/page/@?nsfw=true",
    pages: 4
  }, {
    url: "https://knowyourmeme.com/memes/among-us-twerk/photos/page/@?nsfw=true",
    pages: 3
  }, {
    url: "https://knowyourmeme.com/memes/sus-among-us/photos/page/@?nsfw=true",
    pages: 2
  }
]

module.exports = {
  name: "amogus",
  description: "amogus",
  usage: "[command]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["amongus", "sus", "sussy", "ඞ", "sex"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {

    const arrImgs = []

    var getRandonIndex = (index) => Math.floor(Math.random() * index);

    var indexRandom = Math.floor(Math.random() * getRandonIndex(urlsData.length));

    var randomPageURL = getRandonIndex(urlsData[indexRandom].pages)

    var currentURL = String(urlsData[indexRandom].url).replace("@", randomPageURL)

    let excuseAPI = await fetch(currentURL)

    let htmlText = await excuseAPI.text();

    let $ = cheerio.load(htmlText)

    $('div[class="item"]').each((_, e) => {
      let div = cheerio.load(e);
  
      let urlImg = div("img").attr("data-src");
      
      if(urlImg === "https://s.kym-cdn.com/assets/image-covers/nsfw-3d2ea71540aadd32da0d94d49026c272.png"){
        urlImg = div("img").attr("data-original-image-url");
      }
  
      let goodImg = urlImg.replace("masonry", "newsfeed")
      arrImgs.push(goodImg)
    })

    let indexIMGRandom = getRandonIndex(arrImgs.length);

    let currentIMGUrl = arrImgs[indexIMGRandom] || "https://media.tenor.com/gQV5VzHLWQIAAAAM/among-us-sus.gif";

    message.channel.send(currentIMGUrl);
  },

  SlashCommand: null
};
