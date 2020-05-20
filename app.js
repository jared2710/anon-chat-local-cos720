var program = require('commander');
var inquirer = require('inquirer');

var Chatroom = require('./Chatroom');
var chatroom = new Chatroom("anon-chat-cos720.herokuapp.com");

console.log("WELCOME TO \x1b[91mANON-CHAT\x1b[0m: A project for \x1b[91mCOS720\x1b[0m");

program
	.version("1.0.0")
	.option('-f, --fetch', 'fetch and display all joinable chatrooms')
	.option('-j, --join [room]', 'join a room to see and send messages')
	.parse(process.argv);

if(program.fetch)
{
	console.log("\nFetching all available chatrooms...");
	chatroom.getAllRooms();
}
else if (program.join)
{
	if(program.join == true)
	{
		console.log("\nYou did not enter a chatroom to join, please specify one after the -j option.");
	}
	else
	{
		console.log("\nJoined chatroom \x1b[93m" + program.join + "\x1b[0m!");
		console.log("\nFetching messages from chatroom \x1b[93m" + program.join + "\x1b[0m...");
		chatroom.getAllMessages(program.join, promptWithinRoom);
	}
}



function promptWithinRoom(chatroomName)
{
	console.log();
	inquirer
	.prompt(
	[
		{type:"input", name:"option",
		message:"\x1b[92mSelect option, " + chatroom.pseudonym + ":\nRefresh messages (r)\nSend message and refresh (s)\nNew identity (i)\nQuit (q)\n>\x1b[0m"}
	])
	.then(answers =>
	{
		var option = answers.option;
		if(option == "r")
		{
			console.log("\nFetching messages from chatroom \x1b[93m" + chatroomName + "\x1b[0m...");
			chatroom.getAllMessages(chatroomName, promptWithinRoom);
		}
		else if(option == "s")
		{
			inquirer
				.prompt(
				[
					{type:"input", name:"message", message:"Enter message:"}
				])
				.then(answers =>
				{
					var message = answers.message;
					console.log("\nSending message to chatroom \x1b[93m" + chatroomName + "\x1b[0m...");
					chatroom.sendMessage(chatroomName, message, function()
					{
						console.log("\nFetching messages from chatroom \x1b[93m" + chatroomName + "\x1b[0m...");
						chatroom.getAllMessages(chatroomName, promptWithinRoom);
					});
					
				})
				.catch(error =>
				{
					console.log("\nError in message entry!");
					console.log(error);
				});
		}
		else if(option == "i")
		{
			console.log("\nChanging identity for all chatrooms...");
			chatroom.changeIdentity();
			console.log("Changed identity for all chatrooms.");
			promptWithinRoom(chatroomName);
		}
		else if(option == "q")
		{
			console.log("\nQuitting \x1b[91mANON-CHAT\x1b[0m. See you soon!");
		}
		else
		{
			console.log("\nInvalid option selected.");
			promptWithinRoom(chatroomName);
		}
	})
	.catch(error =>
	{
		console.log("\nError in option entry!");
		console.log(error);
	});
}

