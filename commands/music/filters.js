const filters = [
    'bassboost',
    'nightcore',
    'vaporwave',
    'pop',
    'soft',
    'treblebass',
    '8D',
    'karoke',
    'reset'
];

// these are filters for bot
/**
 * Includes 8d karoke etc..
 * 
 */

const Discord = require("discord.js");
const emoji = require('../../config/emoji.json');
module.exports = {
  name: "filters",
  aliases: [],
  cooldown: 1000 * 2,
  bot_permission: ["SEND_MESSAGES", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
  user_permission: [],
  category: "music",
  description: "Play any song you want.",

  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {String[]} args
   */

  async execute(client, message, args) {
      const filer = filters.map(i => {
          return `\`${i.toUpperCase()}\``;
      });

      const embeds = [
          new Discord.MessageEmbed()
          .setDescription(`Filters for bot\n**__TIP__**\nWant to suggest filters, join our community\n**Filters**\n${filer.join(",")}`)
          .setColor("PURPLE"),
      ];

      message.reply({
          embeds,
      })

  },
};

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 */