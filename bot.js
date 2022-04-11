const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv')
const fetch = require('node-fetch');
dotenv.config()
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

// Options to create a new thread
const client = new Client({ intents: [Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });




client.on('ready', () => {
    client.users.fetch('170836301266812929').then((user) => {
        user.send('The discord bot restarted');
    });
});

const selling = ['selling', 'Selling', 'SELLING', 'sell', 'Sell', 'SELL'];

async function checkChannelIsSet(message) {
    const { exists } = await fetch(`http://localhost:5000/api/checkdiscordchannelset?channelid=${message.channel.guild.id}`).then(response => response.json());
    if (exists === 'true') {
        return true;
    } 
    return false;
}

client.on('messageCreate', async (message) => {
    if (message.content !== '!addtradechannel') return;
    
    if (checkChannelIsSet === 'true') {
        return message.channel.send('The channel has been added to the list of channels to be used for trading');
    }
    return message.channel.send('The channel has not been added to the list of channels to be used for trading');
});





client.login(process.env.TOKEN).catch((e) => { console.error(e) });