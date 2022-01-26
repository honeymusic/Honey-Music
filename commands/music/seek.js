const Discord = require("discord.js");
const emoji = require("../../config/emoji.json");
const ere = require('erela.js');
module.exports = {
  name: "seek",
  aliases: ["sk"],
  cooldown: 1000 * 5,
  bot_permission: ["SEND_MESSAGES", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
  user_permission: [],
  category: "music",
  description: "Wanna seek duration??",

  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {String[]} args
   */

  async execute(client, message, args) {
    const player = message.client.manager.get(message.guild.id);
    if (!player)
      return message.reply(
        `${emoji.wrong} | there is no music and player for the guild`
      );

      /**
       * @param {ere.Player} player 
       */

    const { channel } = message.member.voice;
    if (!channel) return message.reply(`${emoji.wrong} | you need to join a voice channel.`);
    if (channel.id !== player.voiceChannel)
      return message.reply(`${emoji.wrong} | you're not in the same voice channel.`);

    if (!player.queue.current)
      return message.reply(`${emoji.wrong} | there is no music playing.`);

      const seekNum = args[0];

      if(!seekNum) return message.reply(`${emoji.wrong} | You need to provide argument`)
      if(isNaN(seekNum)) return message.reply(`${emoji.wrong} | You need to provide a nunber`)

      const { duration } = player.queue.current;

      if(args[0] >= duration) return message.reply(`${emoji.wrong} | The arguments you provided is greater then music duration`)

      player.seek(1000 * seekNum);

      message.reply(`${emoji.correct} | Succesfully seeked`)
  },
  
};

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 */