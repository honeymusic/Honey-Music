const Discord = require("discord.js");
const emoji = require("../../config/emoji.json");
module.exports = {
  name: "search",
  aliases: [],
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
    let whatToSearch = args.join(" ");

    if (!whatToSearch)
      return message.reply(
        `${emoji.wrong} | You need to provide a song to play`
      );

    const { channel } = message.member.voice;

    if (!channel)
      return message.reply(
        `${emoji.wrong} | You need to join a voice channel to play music`
      );
    const player =
      message.client.manager.get(message.guild.id) ||
      client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
      });

    if (channel.id !== player.voiceChannel)
      return message.reply(
        `${emoji.wrong} | you're not in the same voice channel.`
      );

    const results = await client.manager.search(whatToSearch, message.author);
    const tracks = results.tracks.slice(0, 5);
    let resultDescription = "";
    let counter = 1;
    for (const track of tracks) {
      resultDescription += `\`-\` **${counter}.** [${track.title}](${track.uri})\n`;
      counter++;
    }

    message
      .reply({
        content: "Which song would you choose to play?",
        embeds: [
          new Discord.MessageEmbed()
            .setDescription(resultDescription)
            .setColor("RANDOM"),
        ],
      })
      .then((msg) => {
        const filter = (m) => m.author.id == message.author.id;
        const collector = message.channel.createMessageCollector({
          filter,
          time: 15000,
          max: 1,
        });

        collector.on("collect", async (m) => {
          if (isNaN(m)) return message.reply("You must provide a number");
          const track = tracks[m.content - 1];

          let player = message.client.manager.get(message.guild.id);

          if (!player.playing && !player.paused && !player.queue.size) {
            player.connect();
            player.play(track);
          }

          if (player) {
            player.queue.add(track);

            if(msg.editable) {
                msg.edit({
                    embeds: [new Discord.MessageEmbed()
                    .setTitle(`${track.title}`)
                .setDescription("")
            .setThumbnail(`${track.thumbnail || "https://media1.giphy.com/media/tqfS3mgQU28ko/giphy.gif"}`)
        .setColor("RANDOM")]
                })
            }
          } else {
            player.queue.add(track);
            player.play();
            message.reply(
              `${emoji.wrong} | There is no player for this guild.`
            );
          }
        });

        collector.on("end", (collected) => {});
      });
  },
};

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 * @info Github: https://github.com/Aryan700coder/Honey-Music
 */
