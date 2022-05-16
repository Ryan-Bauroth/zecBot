// Require the necessary discord.js classes
const { channelMention } = require('@discordjs/builders');
const { Client, Intents } = require('discord.js');
const { Console } = require('winston/lib/winston/transports');
const { token } = require('./config.json');
// Create a new client instance
const client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES
] });
//Basic Variables
const id = "764241702562037773";

var zecQuotes = ['No bitches?','Did I ask?','Folded.','Simmer down lil bro','ratio',':skull:','bruh','are you freaking kidding me bro','SHELLY IS SO DUMB ITS UNFAIR','Ok but where is your rank 30 brawler?', 'so bad', 'so fat', ':smirk_cat::thumbsup:','HUUUUUUUUUUUUUUH?????','kid','this is brain damage','smooth brain',':moyai:','this is so aids','Common L', 'so good','ion wanna hear it','typical proccess','Process?',"Proccess check?",'aint no way','no shot','no freaking way dude','no shot','tf do you mean','mid','no shot bro','you fumbled the bag','why did you add this bot tho','u think ur some sort of comedian today huh?','this is why nobody likes you']
//				@Desl					2					@Josh				2					3						@Turtle						@P1				@Xtroyer			@f1				@ange					@froot				2						tyler				jman				pigs
var pings = ['537805054334337033','537805054334337033','835574860772147250','835574860772147250','835574860772147250','479656417104494602','656232624309927956','498524408604786715','479645386751868938','758380474195378236','728771398561955912','728771398561955912','607588966392266756','468126093606387712','744683791443820678']
var muted = false;

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
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
		message.reply({
			content:'DM NinjaPig to stop zecs pings @u',
		})
	}
	//starts @s
	if(message.content === '!zecPersonalUnmute' || message.content === '!zecPUM'){
		message.reply({
			content:'DM NinjaPig to start zecs pings @u',
		})
	}
	//suggests phrases
	if(message.content === '!zecSuggest' || message.content === '!zecS'){
		message.reply({
			content:'DM NinjaPig for rn to suggest but there will be a voting thing maybe? idk i have to figure out reactions',
		})
		muted = true;
	}
	if(muted == false){
		if(message.content === '!zecBot' || message.content === '!zec'){
			message.reply({
				content:zecQuotes[getRandomInt(zecQuotes.length)],
			})
		}
		// dont reply to urself
		else if(message.author.id === '886397787485376552'){
			
		}
		else if(getRandomInt(10) == 1){
			if(getRandomInt(7) == 1){
				var channel = client.channels.fetch(id).then(channel => channel.send(`<@${pings[getRandomInt(pings.length)]}>` + ' ' + zecQuotes[getRandomInt(zecQuotes.length)]))
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

// Login to Discord with your client's token
client.login(token);