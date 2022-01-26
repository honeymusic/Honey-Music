/**
 * Error Handler
 * This will never crash your bot!!!
 */

module.exports = client => {
    process.on('unhandledRejection', (reason, p) => {
         console.log('[antiCrash] :: Unhandled Rejection/Catch'.red);
         console.log(reason, p);
     });
     process.on("uncaughtException", (err, origin) => {
         console.log('[antiCrash] :: Uncaught Exception/Catch'.red);
         console.log(err, origin);
     }) 
     process.on('uncaughtExceptionMonitor', (err, origin) => {
         console.log('[antiCrash] :: Uncaught Exception/Catch (MONITOR)'.red);
         console.log(err, origin);
     });
     process.on('multipleResolves', (type, promise, reason) => {
         console.log('[antiCrash] :: Multiple Resolves'.red);
         console.log(type, promise, reason,);
     });
 }

/**
 * @info Give credits if your using this music
 * @info programmed by !" ╰‿╯ ᴰʸⁿᵒΔRΨΔΠ†ᶜᵒᵐᵉᵇᵃᶜᵏ#6969
 * @info #roadto100subs
 * @info Github: https://github.com/Aryan700coder/Honey-Music
 */