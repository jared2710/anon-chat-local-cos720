var ChatroomServerInterface = require('./ChatroomServerInterface');
var IdentityManager = require('./IdentityManager');

var fs = require('fs');

class Chatroom
{
	constructor(hostname)
	{
		this.hostname = hostname;
		this.csi = new ChatroomServerInterface(hostname);
		this.identityManager = new IdentityManager();
	}

	print()
	{
		console.log();
		console.log("Chatroom object:");
		console.log("- hostname: " + this.hostname);
		console.log();
	}

	changeIdentity()
	{
		this.identityManager.changeIdentity();
	}

	pseudonym()
	{
		return this.identityManager.pseudonym();
	}

	sendMessage(chatroom, message, callback)
	{
		this.csi.sendToServer(
		{"type" : "sendMessage", "auth" : this.identityManager.auth(), "message" : message, "chatroom" : chatroom},
		function (body)
		{
			console.log("STATUS OF MESSAGE SENT TO \x1b[93m" + chatroom +"\x1b[0m:");
			if(body.status == 1)
			{
				console.log("Successfully sent message!");
			}
			else
			{
				console.log("Message failed to send: " + body.data);
			}
			callback(chatroom);
		});
	}

	getAllMessages(chatroom, callback)
	{
		var myName = this.identityManager.pseudonym();
		this.csi.sendToServer(
		{"type" : "getAllMessages", "auth" : this.identityManager.auth(), "chatroom" : chatroom},
		function (body)
		{
			console.log("MESSAGES IN CHATROOM \x1b[93m" + chatroom + "\x1b[0m:");
			if(body.status == 1)
			{
				body = body.data;
				if(body.length == 0)
				{
					console.log("\x1b[37m- No messages yet!\x1b[0m");
				}
				for(var i = 0; i < body.length; i++)
				{
					var thisOne = body[i];
					if(thisOne.user === myName)
					{
						thisOne.user = "\x1b[32m" + thisOne.user + "\x1b[0m";
					}
					else
					{
						thisOne.user = "\x1b[94m" + thisOne.user + "\x1b[0m";
					}
					console.log("- " + thisOne.user + ": \x1b[37m(" + thisOne.time + ")\x1b[0m " + thisOne.message);
				}
			}
			else
			{
				console.log(body.data);
			}
			callback(chatroom);
		});
	}

	getAllRooms()
	{
		this.csi.sendToServer(
		{"type" : "getAllChatroomNames", "auth" : this.identityManager.auth()},
		function (body)
		{
			console.log("ALL AVAILABLE CHATROOMS:");
			if(body.status == 1)
			{
				body = body.data;
				if(body.length == 0)
				{
					console.log("\x1b[37m- No available chatrooms on this server.\x1b[0m");
				}
				for(var i = 0; i < body.length; i++)
				{
					var thisOne = body[i];
					console.log("\x1b[93m" + thisOne + "\x1b[0m");
				}
			}
			else
			{
				console.log(body.data);
			}
		});
	}

	
}

module.exports = Chatroom;
