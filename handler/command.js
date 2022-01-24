const fs = require("fs");
var color = require('colors')
module.exports = (client) => {
  const commandFolders = fs.readdirSync("./commands");

  for (const folder of commandFolders) {
    const commandsFiles = fs
      .readdirSync(`./commands/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandsFiles) {
      const command = require(`../commands/${folder}/${file}`);
      console.log(`✅ | Message Command | Loaded ${file}`.yellow);
      client.commands.set(command.name, command);
    }
  }
};

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 */