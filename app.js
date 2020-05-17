var program = require('commander');
var inquirer = require('inquirer');

var Chatroom = require('./Chatroom');
var chatroom = new Chatroom("anon-chat-cos720.herokuapp.com");

program
	.version("1.0.0")
	.option('-f, --fetch', 'fetch and display all joinable chatrooms')
	.option('-j, --join [room]', 'join a room to see and send messages')
	.parse(process.argv);


function promptWithinRoom(chatroomName)
{
	console.log();
	inquirer
	.prompt(
	[
		{type:"input", name:"option",
		message:"Select option:\nRefresh messages (r)\nSend message and refresh (s)\nNew identity (i)\nQuit (q)\n>"}
	])
	.then(answers =>
	{
		var option = answers.option;
		if(option == "r")
		{
			console.log("\nFetching messages from chatroom " + chatroomName + "...");
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
					console.log("\nSending message to chatroom " + chatroomName + "...");
					chatroom.sendMessage(chatroomName, message, function()
					{
						console.log("\nFetching messages from chatroom " + chatroomName + "...");
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
			console.log("\nChanging identity for " + chatroomName + "...");
			chatroom.changeIdentity();
			console.log("Changed identity for " + chatroomName + ".");
			promptWithinRoom(chatroomName);
		}
		else if(option == "q")
		{
			console.log("\nQuitting now. See you soon!");
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

if(program.fetch)
{
	console.log("\nFetching all available chatrooms...");
	chatroom.getAllRooms();
}
else if (program.join)
{
	console.log("Joined chatroom " + program.join + "!");
	console.log("\nFetching messages from chatroom " + program.join + "...");
	chatroom.getAllMessages(program.join, promptWithinRoom);
}

