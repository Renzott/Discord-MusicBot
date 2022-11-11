const { MessageEmbed } = require("discord.js");
const translate = require("@vitalets/google-translate-api");
const { default: fetch } = require("node-fetch");
const cheerio = require('cheerio');

module.exports = {
  name: "excuse",
  description: "excuse",
  usage: "[command]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["oldbone", "hueso","verdadero","rollero","domingo"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {

    let excuseAPI = await fetch("https://generatorfun.com/code/model/generatorcontent.php?recordtable=generator&recordkey=84&gen=Y&itemnumber=10&randomoption=undefined&genimage=Yes&geneditor=Yes&nsfw=undefined&keyword=undefined&searchfilter=&searchfilterexclude=&tone=Normal&prefix=None&randomai=No")

    let dataExcuse = await excuseAPI.text();

    let $ = cheerio.load(dataExcuse)

    let readExcuseHTML = $("#textblock0").text()

    let excuseTranslate = await translate(readExcuseHTML, { from: 'en', to: 'es' }).then(res => res.text)
      .catch(err => {
        console.error(err);
      });

    message.channel.send("che hueso, hoy no voy a poder jugar. " + excuseTranslate);
  },

  SlashCommand: null
};