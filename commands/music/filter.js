const Discord = require("discord.js");
const emoji = require('../../config/emoji.json');
module.exports = {
  name: "filter",
  aliases: ["f"],
  cooldown: 1000 * 3,
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
    const player = message.client.manager.get(message.guild.id);
    if (!player) return message.reply(`${emoji.wrong} there is no music and player for the guild`);

    const { channel } = message.member.voice;
    if (!channel) return message.reply("you need to join a voice channel.");
    if (channel.id !== player.voiceChannel) return message.reply("you're not in the same voice channel.");

    if (!player.queue.current) return message.reply(`${emoji.wrong} there is no music playing.`);

    const filters = [
        'bassboost',
        'nightcore',
        'vaporwave',
        'pop',
        'soft',
        'treblebass',
        'eigthD' || '8D',
        'karoke',
        'reset'
    ];

    const whatFilter = args[0];

    if(!whatFilter) return message.reply("You didn't provided any arguments");

    if(whatFilter === "bassboost") {
        player.bassbost = true;
        message.reply("Changed filter to **bassbost**")
    } else if(whatFilter === "nightcore") {
        player.nightcore = true;
        message.reply("Changed filter to **nightcore**");
    } else if(whatFilter === "vaporwave") {
        player.vaporwave = true;
        message.reply("Changed filter to **vaporwave**");
    } else if(whatFilter === "pop") {
        player.pop = true;
        message.reply("Changed filter to **pop**");
    } else if(whatFilter === 'reset') {
        player.reset();
        message.reply("Sucesffuly resetted the filter")
    } else if(whatFilter === 'soft') {
        player.soft = true;
        message.reply("Changed filter to **soft**")
    } else if(whatFilter === 'karoke') {
        player.karoke = true;
        message.reply("Changed filter to **karkore**")
    }
  },
};

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 */