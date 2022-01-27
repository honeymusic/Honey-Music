const Discord = require("discord.js");
const emoji = require('../../config/emoji.json');
module.exports = {
  name: "grab",
  aliases: ["save"],
  cooldown: 1000 * 5,
  bot_permission: ["SEND_MESSAGES", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
  user_permission: ["MANAGE_GUILD"],
  category: "music",
  description: "Wanna save a song??",
 
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

    const { title, author, thumbnail, uri } = player.queue.current;

    const embed = new Discord.MessageEmbed()
    .setTitle(title)
    .setURL(uri)
    .setDescription(`${emoji.correct} | Saved **${title}**\nAuthor: **${author}**`)
    .setThumbnail(`${thumbnail || "https://media1.giphy.com/media/tqfS3mgQU28ko/giphy.gif"}`)
    .setFooter({
        text: `Requested by ${message.author.username}`,
        iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`
    })
    .setColor("RANDOM");

    message.reply({
        embeds: [embed],
    }).then(msg => {
        msg.pin();
    });

    message.author.send({
        embeds: [embed],
        content: `${emoji.correct} | Song saver requested by you.`
    }).catch(e => {
        return message.reply("Your dm is off, I cannot send to you")
    })
  },
};

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 * @info Github: https://github.com/Aryan700coder/Honey-Music
 */