const Discord = require("discord.js");
const emoji = require('../../config/emoji.json');
module.exports = {
  name: "play",
  aliases: ["p"],
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

    let songName = args.join(' ')

    if(!songName) return message.reply(`${emoji.wrong} | You need to provide a song to play`)
    const res = await client.manager.search(
      args.join(' '),
      message.author
    ).catch(e => console.log(e));

    if(!res) return message.reply(`${emoji.wrong} | Cannot find the music you wanted`)

    const { channel } = message.member.voice;

    if (!channel)
      return message.reply(`${emoji.wrong} | You need to join a voice channel to play music`);
    var player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id, 
    });

    if (channel.id !== player.voiceChannel)
      return message.reply(`${emoji.wrong} | you're not in the same voice channel.`);
    player.connect();

    player.queue.add(res.tracks[0]);
    message.reply(`🎵🔎 Fetched **${res.tracks[0].title}**`).then((msg) => {
      setTimeout(() => {
        msg.delete();
      }, 7000);
    });

    if (!player.playing && !player.paused && !player.queue.size) player.play().catch(e => console.log(e));;
    if (
      !player.playing &&
      !player.paused &&
      player.queue.totalSize === res.tracks.length
    )
      player.queue.add(res.tracks[0]);
  },
};

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 * @info Github: https://github.com/Aryan700coder/Honey-Music
 */