const Discord = require("discord.js");
const emoji = require('../../config/emoji.json');
module.exports = {
  name: "loop",
  aliases: ["repeat"],
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
    const player = message.client.manager.get(message.guild.id);
    if (!player) return message.reply(`${emoji.wrong} | there is no player for this guild.`);

    const { channel } = message.member.voice;
    
    if (!channel) return message.reply(`${emoji.wrong} | you need to join a voice channel.`);
    if (channel.id !== player.voiceChannel) return message.reply(`${emoji.wrong} | you're not in the same voice channel.`);
    
    if (args.length && /queue/i.test(args[0])) {
      player.setQueueRepeat(!player.queueRepeat);
      const queueRepeat = player.queueRepeat ? `enabled` : `disabled`;
      return message.reply(`${emoji.correct} | ${queueRepeat} queue is looped.`);
    }

    player.setTrackRepeat(!player.trackRepeat);
    const trackRepeat = player.trackRepeat ? `enabled` : `disabled`;
    return message.reply(`${emoji.correct} | ${trackRepeat} track is looped.`);
  },
};

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 */