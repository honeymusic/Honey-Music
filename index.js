const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({
    intents: 32767,
    allowedMentions: {
        repliedUser: false,
    }
});

client.commands = new Discord.Collection();
client.slash = new Discord.Collection();

/**
 * @comment Requiring Handlers 
 */
/*************************************/
require('./handler/command')(client);
require('./handler/event')(client);
require('./handler/erela')(client);
require('./handler/antiCrash')(client);
client.on("error", (e) => {
    console.error(e);
});
/*************************************/
/**
 * @comment I don't know what it does lmao
 */
/*************************************/
client.on("raw", (d) => client.manager.updateVoiceState(d));
/*************************************/

/*************************************/
/**
 * @comment Logging into bot
 * @comment everyone knows that xD
 */
client.login(process.env.token);

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 * @info Github: https://github.com/Aryan700coder/Honey-Music
 */