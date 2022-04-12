const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv')
const fetch = require('node-fetch');
dotenv.config()
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

// Options to create a new thread
const client = new Client({ intents: [Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });




client.on('ready', () => {
    //client.users.fetch('170836301266812929').then((user) => {
    //    user.send('The discord bot restarted');
    //});
});

const selling = ['selling', 'sell'];

async function checkChannelIsSet(message) {
    const { exists } = await fetch(`http://localhost:5000/api/setDiscordChannel?channelid=${message.channel.id}&guildid=${message.guild.id}&guildname=${message.guild.name}&secret=${process.env.SECRET}`).then(response => response.json());
    if (exists === 'created') {
        return {exists: true, message: 'The guid has been registered and the channel has been added'};
    }
    if (exists === 'true') {
        return {exists: true, message: 'The channel has been added to the list of channels to be used for trading'};
    }
    return {exists: false, message: 'Channel already exists in the list of channels to be used for trading'};
}

async function checkChannelIsValid(message){
    const { exists } = await fetch(`http://localhost:5000/api/checkDiscordChannel?channelid=${message.channel.id}&secret=${process.env.SECRET}`).then(response => response.json());
    if (exists !== 'true') return false;
    return true;
}

client.on('messageCreate', async (message) => {

    const chanelCheck = await checkChannelIsSet(message);

    if (message.content !== '!addtradechannel') return;
    if (!message.member.permissions.has('ADMINISTRATOR')) return;

    return message.channel.send(chanelCheck.message);
});

client.on('messageCreate', async (message) => {
    includesCheck = selling.find(v => message.content.toLowerCase().includes(v))
    if (includesCheck == undefined) return;    
    
    const chanelCheck = await checkChannelIsValid(message);
    console.log(chanelCheck);
    if(!chanelCheck) return 
    console.log('now we create a new post');


});



client.login(process.env.TOKEN).catch((e) => { console.error(e) });