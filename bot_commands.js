var bot_commands = [
	{
		title : 'join',
		cmd : '$join',
		description : "Tell the bot to  join the 'general' voice channel."
	},
	{
		title : 'info',
		cmd : '$info',
		description : "Output information about this server and it's channels to the console."
	},
	{
		title : 'peace',
		cmd : '$peace',
		description : "Tell the bot to leave the 'general' voice channel."
	},
	{
		title : 'weather',
		cmd : '$weather',
		regex : /^\$weather\s+/i,
		description : "Input location name or area code and output weather forecast."
	},
	{
		title : 'help',
		cmd : '$help',
		description : "Shows available commands."
	}
]

var getCommands = () => {
	var help_message = "";
	bot_commands.forEach( item => {
		help_message += "\n" + item.cmd + " : " + item.description ;
	});
	return help_message;
}

var initCommands = () => {
	var cmds = {};
	bot_commands.forEach( item => {
		cmds[item.title] = item.regex ? item.regex : item.cmd;
	});
	return cmds;
}

module.exports = {
	getCommands,
	initCommands
}
