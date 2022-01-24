const ms = require("ms");
const Discord = require("discord.js");
const Timeout = new Discord.Collection();
const { Bot } = require('../config/config.json');
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @returns ok
 */
module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (message.channel.type === "DM") return;

  const prefix = Bot.prefix;
  if (message.content.toLowerCase().startsWith(prefix)) {
    const args = message.content
      .slice(prefix.toLowerCase().length)
      .trim()
      .split(' ');
    const commandName = args.shift().toLowerCase();

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );
    if (!command) return;
    if (command) {
      if (command.user_permission && command.user_permission.length > 0) {
        if (!message.member.permissions.has(command.user_permission))
          return message.channel
            .send(
              `You don't have permissions \`${command.user_permission}\` to use this command.`
            )
            .catch((err) => console.log(err));
      }
      if (command.bot_permission && command.bot_permission.length > 0) {
        if (!message.member.guild.me.permissions.has(command.bot_permission))
          return message.channel
            .send(`I need \`${bot_permission}\` permission to use this command`)
            .catch((err) => console.log(err));
      }

      function embedBuilder(client, message, color, title, description) {
        let embed = new Discord.MessageEmbed()
        .setColor(`${color}`)
        .setFooter({
          text: `Copyright Trashboat 2020`,
        })
        .setTimestamp();
        if(title) embed.setTitle(`${title}`)
        if(description) embed.setDescription(`${description}`)

        message.reply({
          embeds: [embed]
        })
      }
      if (command.cooldown) {
        if (Timeout.has(`${command.name}${message.author.id}`))
          return message.reply(`Please wait \`${ms(
            Timeout.get(`${command.name}${message.author.id}`) - Date.now(),
            { long: true }
          )}\`To use this command again!`)
        command.execute(client, message, args);
        Timeout.set(
          `${command.name}${message.author.id}`,
          Date.now() + command.cooldown
        );
        setTimeout(() => {
          Timeout.delete(`${command.name}${message.author.id}`);
        }, command.cooldown);
      } else command.execute(client, message, args);
    }
  }
};

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 */