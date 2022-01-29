const Discord = require("discord.js");
const emoji = require('../../config/emoji.json');
const config = require('../../config/config.json');
const colors = require('colors');
module.exports = {
  name: "skipto",
  aliases: ["sto"],
  cooldown: 1000 * 5,
  bot_permission: ["SEND_MESSAGES", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
  user_permission: [],
  category: "music",
  description: "Skip To any song you want!",

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

    try {
        if(!args[0]) return message.reply(`${emoji.wrong} | usage: **${config.Bot.prefix}skipto <number>**`);
        if(isNaN(args[0])) return message.reply(`${emoji.wrong} | You must provide a number.`);
        if (Number(args[0]) > player.queue.size) return message.reply(`${emoji.wrong} | Could not find the song you want to skip.`)

        player.queue.remove(0, Number(args[0]) - 1);

        player.stop();
        
        message.reply(`${emoji.correct} | ${emoji.music.skip} Skipped **${Number(args[0] - 1)}** songs!`)
    } catch (e) {
        console.log(`
        Error: 
        ${String(e).red}
        `)
        return message.reply(`${emoji.wrong} | Oops.`)
    }
  },
};

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 * @info Github: https://github.com/Aryan700coder/Honey-Music
 */