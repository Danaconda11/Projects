const Discord = require("discord.js");
const client = new Discord.Client();
const helpers = require('./weather.js');
const commands_ = require('./bot_commands');
// const ffmpeg = require('@ffmpeg-installer/ffmpeg');

var cmd = commands_.initCommands();

client.on('ready', () => {
  console.log('Bot is Online');
})
.on("message", msg => {
	/*
		For speaking in the general text channel
	*/
	if(msg.channel.name === 'general') {
		/*
			Useless bot response
		*/
		if (/LOL/i.test(msg.content)) {
			msg.channel.startTyping();
				setTimeout(() => {
				msg.channel.stopTyping();
				msg.channel.send(`Oh ${msg.author.username}, you're SO funny!`)
					.then(()=>{
						console.log("laughing response sent");
					});
				}, 2000)
		}
		/*
			Join the general voice channel
		*/
		if (msg.content === cmd.join) {
			client.channels.find("name", "General").join()
				.then(connection => {
					console.log("Connected to General Chat");
					msg.channel.send(`Online!`);
				})
				.catch(console.error);
		}
		/*
			Leave the channel
		*/
		if (msg.content === cmd.peace) {
			msg.channel.send(`I have to go, bye everyone!`);
			client.channels.find("name", "General").leave();
		}
		/*
			Show all channel info in the console
		*/
		if (msg.content === cmd.info) {
			console.log("Displaying Info.");
			console.log(msg.channel);
		}
		/*
			get the weather for a specified area
		*/
		if (cmd.weather.test(msg.content)) {
			msg.channel.startTyping();
			helpers.getWeather(msg.content)
				.then( response => {
					msg.channel.send(response.message);
					msg.channel.stopTyping();
				})
				.catch( e => {
					msg.channel.send(e.message);
					msg.channel.stopTyping();
				})
		}
		/*
			display help menu
		*/
		if (msg.content === cmd.help) {
			msg.channel.send(commands_.getCommands());
		}

	}//END GENERAL OR MUSIC TEXT CHANNEL


});

client.login('DISCORD KEY');
