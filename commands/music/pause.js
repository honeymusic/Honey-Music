const Discord = require("discord.js");
const emoji = require('../../config/emoji.json');
module.exports = {
  name: "pause",
  aliases: [],
  cooldown: 1000 * 5,
  bot_permission: ["SEND_MESSAGES", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
  user_permission: [],
  category: "music",
  description: "Pause a music. You can pause and drink some water!",

  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {String[]} args
   */

  async execute(client, message, args) {
    let player = client.manager.get(message.guild.id);
    if (!player) return message.reply(`${emoji.wrong} | there is no music and player for this guild.`);

    const { channel } = message.member.voice;

    if (!channel) return message.reply(`${emoji.wrong} | you need to join a voice channel.`);
    if (channel.id !== player.voiceChannel) return message.reply(`${emoji.wrong} | you're not in the same voice channel.`);
    if (player.paused) return message.reply(`${emoji.wrong} | The player is already paused`);

    player.pause(true);
    return message.reply(`${emoji.correct} | Paused the music.`);
  },
};

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 * @info Github: https://github.com/Aryan700coder/Honey-Music
 */