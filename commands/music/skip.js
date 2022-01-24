const Discord = require("discord.js");
const emoji = require('../../config/emoji.json');
module.exports = {
  name: "skip",
  aliases: ["s"],
  cooldown: 1000 * 5,
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

    if (!player.queue.current) return message.reply(`${emoji.wrong} there is no music playing.`)

    const { title } = player.queue.current;

    player.stop();
    return (await message.reply(`${emoji.correct} **${title}** was skipped.`).then(msg => {
      setTimeout(() => {
        msg.delete().catch(e => console.log(e));
      }, 1000 * 7)
    }))
  },
};

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 */