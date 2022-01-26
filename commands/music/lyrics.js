const Discord = require("discord.js");
const emoji = require('../../config/emoji.json');
const lyricsFinder = require("lyrics-finder");

module.exports = {
  name: "lyrics",
  aliases: ["lyric"],
  cooldown: 1000 * 5,
  bot_permission: ["SEND_MESSAGES", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
  user_permission: [],
  category: "music",
  description: "Find lyrics for the music you want!",

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

    if (!channel)
      return message.reply(`${emoji.wrong} | You need to join a voice channel to play music`);

    if (channel.id !== player.voiceChannel)
      return message.reply(`${emoji.wrong} | you're not in the same voice channel.`);

      let SongTitle = player.queue.current.title;

      SongTitle = SongTitle.replace(
        /lyrics|lyric|lyrical|official music video|\(official music video\)|audio|official|official video|official video hd|official hd video|offical video music|\(offical video music\)|extended|hd|(\[.+\])/gi,
        ""
      );

      let lyrics = await lyricsFinder(SongTitle);
    if (!lyrics)
      return message.reply(`${emoji.wrong} | **No Lyrics found.**`)
    lyrics = lyrics.split("\n");

    const embed = new Discord.MessageEmbed()
    .setTitle(`Lyrics for **${player.queue.current.title}**`)
    .setDescription(`${lyrics}`)
    .setColor("PURPLE");

    message.reply({
        embeds: [embed]
    })
  },
};

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 * @info Github: https://github.com/Aryan700coder/Honey-Music
 */