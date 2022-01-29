const Discord = require('discord.js');
const { Manager } = require('erela.js');
const os = require('os');
let config = require('../config/config.json');
module.exports = async (client) => {
  console.log(`Sucesfully logged in as ${client.user.tag}`);
    client.user.setPresence({ activities: [{ name: `${config.status.statusName}`, type: `${config.status.statusType}` }], status: `${config.status.statusDefault}` });
    client.manager.init(client.user.id);
    console.log(String("\n━━━━━━[Client Stats]━━━━━━\n").red);
    console.log(String("Logged in as: ").grey + String(client.user.tag).brightGreen);
    console.log(String("Default prefix: ").grey + String(config.Bot.prefix).brightGreen);
    console.log(String("Total events: ").grey + String(client.events.size).brightGreen);
    console.log(String("Total commands: ").grey + String(client.commands.size).brightGreen + "\n");

    console.log(String("━━━━━━[System Stats]━━━━━━\n").red);
    console.log(String("Time taken to load: ").grey + String(`${new Date().getTime() % 1000 / 1000}s`).brightGreen);
     console.log(String("NodeJS version: ").grey + String(process.version).brightGreen);
     console.log(String("Platform: ").grey + String(os.platform).brightGreen);
     console.log(String("DiscordJS version: ").grey + String(Discord.version).brightGreen);
    console.log(String("━━━━━━━━━━━━━━━━━━━━━━━━━━━").red);
    require('../server/server')(client);
}

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 * @info Github: https://github.com/Aryan700coder/Honey-Music
 */