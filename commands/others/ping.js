const Discord = require('discord.js');

module.exports = {
    name: "ping",
    aliases: ["latency"],
    cooldown: 1000 * 5,
    bot_permission: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    user_permission: [],
    category: "others",
    description: "Check the latency of bot",

    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */

    async execute(client, message, args) {
        message.channel.send("Pinging...").then(msg => {
            msg.edit(`Pong! | Latencency is ${client.ws.ping}`)
        })
    }
}

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 * @info Github: https://github.com/Aryan700coder/Honey-Music
 */