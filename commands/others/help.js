const Discord = require("discord.js");
const emoji = require('../../config/emoji.json');
const config = require('../../config/config.json');
module.exports = {
  name: "help",
  aliases: ["commands"],
  cooldown: 1000 * 2,
  bot_permission: ["SEND_MESSAGES", "VIEW_CHANNEL", "EMBED_LINKS"],
  user_permission: [],
  category: "others",
  description:
    "It's only to check how much time does it takes to reply to you or do some things.",
  /**
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @param {String[]} args
   */

  /**
   * Idk
   */
  async execute(client, message, args) {
    let j = args[0];

    if (!j) {
      const p = "$";
      let embed = new Discord.MessageEmbed().setDescription(
        `${emoji.correct} All my commands Information\n**Total commands:** ${client.commands.size}`
      );

      let raw = new Discord.MessageActionRow().addComponents(
        new Discord.MessageSelectMenu()
          .setCustomId("help-menu")
          .setPlaceholder("Click here to see category and their commands")
          .addOptions([
            client.categories.map((cat) => {
              return {
                label: `${cat[0].toUpperCase() + cat.slice(1)}`,
                value: cat,
                description: `Click to see all commands of ${cat}`,
              };
            }),
          ])
      );

      let rawz = new Discord.MessageActionRow().addComponents(
        new Discord.MessageSelectMenu()
          .setCustomId("help-menu")
          .setPlaceholder("Click here to see category and their commands")
          .addOptions([
            client.categories.map((cat) => {
              return {
                label: `${cat[0].toUpperCase() + cat.slice(1)}`,
                value: cat,
                description: `Click to see all commands of ${cat}`,
              };
            }),
          ])
          .setDisabled(true)
      );

      message.channel
        .send({
          embeds: [embed],
          components: [raw],
        })
        .then(async (msg) => {
          let filter = (i) => i.user.id === message.author.id;
          let collector = await msg.createMessageComponentCollector({
            filter,
            time: 1000 * 20,
          });

          collector.on("collect", async (i) => {
            if (i.isSelectMenu()) {
              if (i.customId === "help-menu") {
                await i.deferUpdate().catch();
                let [directory] = i.values;
                let aa = new Discord.MessageEmbed()
                  .setColor("RANDOM")
                  .setTitle(`All commands of ${directory}`)
                  .setDescription(
                    `${client.commands
                      .filter((cmd) => cmd.category === directory)
                      .map((cmd) => {
                        return [`**${cmd.name}**\n${emoji.util.reply}${cmd.description}`].join("");
                      })
                      .join("\n")}`
                  )
                  .setFooter({
                    text: `${client.user.username} OP`,
                    iconURL: `${message.author.displayAvatarURL({
                      dynamic: true,
                    })}`,
                  });

                msg.edit({ embeds: [aa] });
              }
            }
          });
          collector.on("end", (c) => {
            let u = new Discord.MessageEmbed()
              .setTitle("Finished")
              .setDescription(
                `${emoji.correct} If you want to see information of a specific command\n You can write \`${config.Bot.prefix}help <command name>\``
              )
              .setColor("BLUE")
              .setTimestamp();
            msg.edit({
              embeds: [u],
              components: [rawz],
            });
          });
        });
    }

    if (j) {
      const command = client.commands.get(args[0]);


      if (command) {
        let e = new Discord.MessageEmbed()
          .setTitle(`${command.name}`)
          .setDescription(
            `**Cooldown:** \`${command.cooldown}\``
          )
          .setColor("GOLD")
          .setTimestamp();

        message.reply({
          embeds: [e],
        });
      } else {
        return message.reply(
          `<a:Crossmark:931102231535702066> | Cannot find \`${j}\``
        );
      }
    }
  },
};
