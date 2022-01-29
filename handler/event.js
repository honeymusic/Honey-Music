const fs = require('fs');
const { bold } = require('colors');
module.exports = (client) => {
    fs.readdir("./events/", (err, files) => {
        if (err) throw err;
        files.forEach(f => {
          console.log(`✅ | Event | Loaded ${f}`.yellow)
            if (!f.endsWith(".js")) return;
            const event = require(`../events/${f}`);
            let eventName = f.split(".")[0];
            client.events.set(eventName, event)
            client.on(eventName, event.bind(null, client));
        });
    }); 

    
}

/**
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                  ┃
┃                                                                  ┃
┃                                                                  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ 
*/

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 * @info Github: https://github.com/Aryan700coder/Honey-Music
 */