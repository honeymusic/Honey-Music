const Discord = require('discord.js');
const emoji = require('../../config/emoji.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'queue',
  aliases: ['q'],
  cooldown: 1000 * 5,
  bot_permission: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'CONNECT', 'SPEAK'],
  user_permission: [],
  category: 'music',
  description: 'Play any song you want.',

  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {String[]} args
   */

  async execute(client, message, args) {
    const player = message.client.manager.get(message.guild.id);
    if (!player) return message.reply(`${emoji.wrong} | there is no player for this guild.`);
    
    const queue = player.queue;
    const embed = new MessageEmbed()
      .setTitle(`Queue for ${message.guild.name}`);
    
    // change for the amount of tracks per page
    const multiple = 10;
    const page = args.length && Number(args[0]) ? Number(args[0]) : 1;
    
    const end = page * multiple;
    const start = end - multiple;
    
    const tracks = queue.slice(start, end);
    
    if (queue.current) embed.addField(`Current`, `**[${queue.current.title}](${queue.current.uri})**`);
    
    if (!tracks.length) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : `the queue`}.`);
    else embed.setDescription(tracks.map((track, i) => `${start + (++i)} - **[${track.title}](${track.uri})**`).join(`\n`));
    
    const maxPages = Math.ceil(queue.length / multiple);
    
    embed.setFooter({
        text: `Page ${page > maxPages ? maxPages : page} of ${maxPages}`
    });
    
    return message.reply({
        embeds: [embed]
    });
  },
};

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 * @info Github: https://github.com/Aryan700coder/Honey-Music
 */