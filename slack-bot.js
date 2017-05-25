var SlackBot = require('slackbots');
const fs = require('fs');

var bot = new SlackBot({
    token: 'token', // Add a bot https://my.slack.com/services/new/bot and put the token
    name: 'RoboGuy'
});

bot.on('start', function() {
	console.log("Bot online.");

	bot.getChannels()
		.then( response => {
			var channels_list = [];

			for (channel of response.channels) {
				channels_list.push(channel.name);
			}

			fs.appendFile('channels.txt', channels_list.join(),
				function(err) {
					if(err) {
						console.log('error writing to channels.txt');
					}
			});
		});

	bot.getUsers()
		.then( response => {
			var names = [];
			for (users of response.members) {
				if (users.name == 'RoboGuy') continue;
				names.push(users.name);
			}
			var message = "Hello " + names.join() + ". It's good to see you."
			bot.postMessage('general', message, null);
		});
})
.on('message', msg => {

})
.on("channel_joined", () => {

})

;
