const Discord = require('discord.js');
/**
 * @param {Discord.Client} client
 * @param {Discord.Interaction} interaction
 */

module.exports = async(client, interaction) => {
    if (!interaction.isCommand()) return;

	const command = client.slash.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (e) {
		console.error(e);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
}

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 */