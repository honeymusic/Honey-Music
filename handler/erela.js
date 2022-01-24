const { Manager } = require('erela.js')
const emoji = require('../config/emoji.json');
const Discord = require('discord.js');
const Spotify  = require("erela.js-spotify");
const filter = require('erela.js-filters');
const { lavalinkNodes } = require('../config/lavalink');
/**
 * 
 * 
 * @param {Discord.Client} client ok
 */
module.exports = async(client) => {
    /******************************************************
     * @info Supports Spotify and Youtube!!!                 
     * @comment This is the handler of erela!
     * @comment I know that I can make a event handler differently but idk        
     ******************************************************/

    /**
     * @comment This functin converts Value to minutes 
     * @comment Example: Like 3:54
     */

     function convert(value) {
        return Math.floor(value / 60) + ":" + (value % 60 ? value % 60 : '00')
    }

    if(!lavalinkNodes) throw Error("Kindly put lavalink");
    client.manager = new Manager({
        nodes: lavalinkNodes,
        plugins: [
            new Spotify({
                clientID: process.env.sclientId,
                clientSecret: process.env.sclientSecret,
                playlistLimit: 0,
                albumLimit: 0,
            }),
            new filter()
        ],
        send(id, payload) {
          const guild = client.guilds.cache.get(id);
          if (guild) guild.shard.send(payload);
        },
      })
        .on("nodeConnect", (node) => console.log(`Node connected`.blue))
        .on("nodeError", (node, error) => {
            console.log(`Node ${node.options.identifier} had an error: ${error.message}`.red);
        })
        .on("trackStart", (player, track) => {
          const embed = new Discord.MessageEmbed()
          .setTitle(`${track.title}`)
          .setURL(`${track.uri}`)
          .setDescription(`Started playing **[${track.title}](${track.uri})** - **(${convert(track.duration / 1000)}) min**`)
          .setColor("BLUE")
          .setThumbnail(`${track.thumbnail || "https://media1.giphy.com/media/tqfS3mgQU28ko/giphy.gif"}`)
          .setTimestamp();
          client.channels.cache
            .get(player.textChannel)
            .send({
              embeds: [embed]
            }).then(msg => {
              setTimeout(() => {
                msg.delete()
              }, 1000 * 9)
            });
        })
        .on("queueEnd", (player) => { 
          client.channels.cache
            .get(player.textChannel)
            .send({
              embeds: [new Discord.MessageEmbed()
              .setDescription(`The queue got ended\nIf you want to loop a queue then write \`>loop\` to loop a queue`)
            .setColor("PURPLE")]
            });
          player.destroy();
        })
        .on("trackEnd", (player, track) => {
            client.channels.cache.get(player.textChannel).send({
              embeds: [new Discord.MessageEmbed()
              .setDescription(`The title **${track.title}** got ended\nIf you want to loop a track then write \`>loop\` to loop a track`)
            .setColor("PURPLE")]
            })
        })
        .on("trackError", (player, track, payload) => {
            console.log(`${payload.error}`)
        })
        .on("trackStuck", (player, track, payload) => {
          console.log(`Oops`)
        })
}

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 * @info Github: https://github.com/Aryan700coder/Honey-Music
 */