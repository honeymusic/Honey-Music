const Discord = require('discord.js');
const unlisted = ["eval", "shutdown"];
const { Bot } = require('../../config/config.json');
module.exports = {
    name: "help",
    aliases: ["?", "commands"],
    cooldown: 1000 * 5,
    bot_permission: ["SEND_MESSAGES", "VIEW_CHANNEL", "EMBED_LINKS"],
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
        const commands = client.commands
            .filter(c => !unlisted.includes(c.name))
            .map(c => `\`${c.name}\``);

            const embeds = new Discord.MessageEmbed()
            .setTitle(`Information of **__${client.user.username}__**`)
            .setDescription(`💪 **__My features__**\n> **${client.commands.size}+ commands**\n😎 **Free music support** Meaning that you don't need to pay anything.\n**Filters** Use filters to inhance music experience!\n**Smooth Music** We use 100+ Lavalink server to give smooth audio\n\n> 🎵 **__Commands__**\n ${commands.join(" | ")}\n> 👤 **__Info__**\nProgrammed by \`!" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969\``)
            .setImage("https://i.gifer.com/origin/98/98a8adb91f24c5bd9a9b24d53d0d66c6.gif")
            .setFooter({
                text: `${client.user.username} on top`,
                iconURL: `${client.user.displayAvatarURL({ format: "png" })}`
            });

            const components = new Discord.MessageActionRow().addComponents(
                new Discord.MessageButton().setLabel("Invite").setEmoji("🔰").setStyle("LINK").setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`),
                new Discord.MessageButton().setLabel("Support Server").setEmoji("😎").setStyle("LINK").setURL(`${Bot.supportServer}`),
            )

            message.reply({
                embeds: [embeds],
                components: [components]
            })
    }
}

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 */