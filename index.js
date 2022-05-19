// Require the necessary discord.js classes
const { channelMention } = require('@discordjs/builders');
const { Client, Intents, MessageReaction } = require('discord.js');
const { Console } = require('winston/lib/winston/transports');
const { token } = require('./config.json');
// Create a new client instance
const client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS
] });
//Basic Variables
const genId = "764241702562037773";
const botId = '901325643474698320';
//testing server
//const id = '975158615520460882'

var zecQuotes = ['No bitches?','Did I ask?','Folded.','Simmer down lil bro','ratio',':skull:','bruh','are you freaking kidding me bro','SHELLY IS SO DUMB ITS UNFAIR','Ok but where is your rank 30 brawler?', 'so bad', 'so fat', ':smirk_cat::thumbsup:','HUUUUUUUUUUUUUUH?????','kid','this is brain damage','smooth brain',':moyai:','this is so aids','Common L', 'so good','ion wanna hear it','typical proccess','Process?',"Process check?",'aint no way','no shot','no freaking way dude','no shot','tf do you mean','mid','no shot bro','you fumbled the bag','why did you add this bot tho','u think ur some sort of comedian today huh?','Nah','this is degenerate','no rank 30']
//				@Desl					2					@Josh				2					3						@Turtle						@P1				@Xtroyer			@f1				@ange					@froot				2						tyler				jman				pigs '537805054334337033','537805054334337033','835574860772147250','835574860772147250','835574860772147250','479656417104494602','656232624309927956','498524408604786715','479645386751868938','758380474195378236','728771398561955912','728771398561955912','607588966392266756','468126093606387712','744683791443820678'
var pings = ['537805054334337033']

var suggestId = []
var suggestions = []
var sentIds = []
//and thats good coding practices (if there becomes more than these 0's then the whole suggest function will break :)
var suggestReactions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var muted = false;

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Running!');
});

//maybe this will work? check intents if nothing happens
client.on('guildCreate', guild => {
	const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    channel.send("Thanks for inviting me")
});

client.on('messageCreate', (message) => {
	//gives commands
	if(message.content === '!zecCommands' || message.content === '!zecC'){
		message.reply({
			content:'!zecM - Mutes, !zecUM - Unmutes, !zecPM - stops pings at u, !zecPUM - starts pings at u, !zecS - Suggests a phrase',
		})
	}
	//mutes the bot
	if(message.content === '!zecMute' || message.content === '!zecM'){
		message.reply({
			content:'Muted',
		})
		muted = true;
	}
	//unmutes the bot
	if(message.content === '!zecUnmute' || message.content === '!zecUM'){
		message.reply({
			content:'Unmuted',
		})
		muted = false;
	}
	//stops @s
	if(message.content === '!zecPersonalMute' || message.content === '!zecPM'){
		var foundAuthor = false;
		for (let x = 0; x < pings.length; x++)
		{
			if(message.author.id === pings[x])
			{
				foundAuthor = true;
				//removes user from list pings
				pings.splice(x)
				//verifies this happens to user
				message.reply({
					content: 'Removed user ' + message.author.id + ' or ' + message.author.username + ' from pings list'
				})
				//lets me know this happened in case I need to restart and should update list
				console.log('Removed user ' + pings[pings.length - 1] + ' or ' + message.author.username + ' from pings list')
			}
		}
		if(foundAuthor === false){
			message.reply('Looks like you are already not reciving pings. Whoops!');
		}
	}
	//starts @s
	if(message.content === '!zecPersonalUnmute' || message.content === '!zecPUM'){
		var foundAuthor = false;
		for (let x = 0; x < pings.length; x++){
			if(message.author.id === pings[x]){
				foundAuthor = true;
				message.reply('Looks like you are already reciving pings silly!')
			}
		}
		if (foundAuthor === false)
		{
			//adds user to list pings
			pings.push(message.author.id);
			//verfies this happens to user
			message.reply({
				content: 'Added user ' + message.author.id + ' or ' + message.author.username + ' to ping list'
			})
			//lets me know this happened in case I need to restart and should update list
			console.log('Added user ' + pings[pings.length - 1] + ' or ' + message.author.username + ' to ping list');
		}
	}
	for (let x = 0; x < suggestId.length; x++){
		if(message.author.id == suggestId[x]){
			suggestions.push(message.content);
			var channel = client.channels.fetch(botId).then(channel => channel.send('Should the suggestion: "' + suggestions[x] + '" be accepeted for zec bot? React with 👍 or 👎 to vote'));
			delete suggestId[x]
		}	
	}
	//suggests phrases
	if(message.content === '!zecSuggest' || message.content === '!zecS'){
		message.reply({
			content: 'Send your suggestion as your next message'
		})
		suggestId.push(message.author.id);
		console.log(suggestId[0])
		
		//https://discordjs.guide/popular-topics/collectors.html#message-collectors - an at home thing to work on
		//https://discordjs.guide/interactions/buttons.html#building-and-sending-buttons - an at home thing to work on
	}
	if(muted == false){
		if(message.content === '!zecBot' || message.content === '!zec'){
			var randomQuote = getRandomInt(zecQuotes.length)
			message.reply({
				content:zecQuotes[randomQuote],
			})
			//testing
			//message.react('💀')
			if (randomQuote === 4){
				//if its "ratio" 
				//message.react('👍')
			}
		}
		// dont reply to urself
		else if(message.author.bot) return;
		//random chance to reply
		else if(getRandomInt(50) === 1){
			//chooses whether to reply or randomly ping people
			if(getRandomInt(7) === 1){
				var channel = client.channels.fetch(genId).then(channel => channel.send(`<@${pings[getRandomInt(pings.length)]}>` + ' ' + zecQuotes[getRandomInt(zecQuotes.length)]))
			}
			else{
				message.reply({
					content:zecQuotes[getRandomInt(zecQuotes.length)],
				})
			}
		}
	}
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	  }
})
client.on('messageReactionAdd', (reaction, user) => {
    console.log('a reaction has been added');
	for (let x = 0; x < suggestions.length; x++){
		if(reaction.message.author == '886397787485376552' && reaction.message.content == 'Should the suggestion: "' + suggestions[x] + '" be accepeted for zec bot? React with 👍 or 👎 to vote'){
			console.log(reaction.emoji.name);
			if(reaction.emoji.name == '👍'){
				suggestReactions[x]++;
				console.log('upvote');
				console.log(suggestReactions);
			}
			else if(reaction.emoji.name == '👎'){
				suggestReactions[x] = suggestReactions[x] - 1;
				console.log('downvote');
				console.log(suggestReactions);
			}
		}
		console.log('works here');
		if(suggestReactions[x] > 4){
			console.log('Added the phrase: "' + suggestions[x] + '" to the phrase list');
			suggestReactions[x] = 0;
			zecQuotes.push(suggestions[x]);
			var channel = client.channels.fetch(botId).then(channel => channel.send('The suggestion: "' + suggestions[x] + '" has been accepted! Thanks to ' + user.username + ' for the last vote!'));
			reaction.message.delete();
		}
}
});

// Login to Discord with your client's token
client.login(token);