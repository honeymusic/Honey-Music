const Discord = require('discord.js');
const os = require('os');
const ere = require('erela.js')
module.exports = {
    name: "stats",
    aliases: ["systemstats", "botstats"],
    cooldown: 1000 * 5,
    bot_permission: ["SEND_MESSAGES", "VIEW_CHANNEL"],
    user_permission: [],
    category: "other",
    description: "It's only to check how much time does it takes to reply to you or do some things.",

    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */

    async execute(client, message, args) {
        const embed = new Discord.MessageEmbed()
        .setTitle(`Stats for **__${client.user.username}__**`)
        .addField("System Stats", `\`-\` <:z_linux:935046400507518986> \`System:\` **${os.platform()}**\n\`-\` <:z_ram:935051919007838218> \`Free Memory\` **${os.freemem() / 1000000}mb**`)
        .addField("Library Info", `\`-\` <:z_discordjs:935048275856351284> \`Discord.JS version:\` **${Discord.version}**\n\`-\` <:z_erelajs:935052258293477456> \`Erela.JS version:\` **2.3.3**`)
        .setColor("BLUE");

        message.reply({
            embeds: [embed]
        })
    }
}

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 * @info Github: https://github.com/Aryan700coder/Honey-Music
 */