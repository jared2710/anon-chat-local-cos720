var ChatroomServerInterface = require('./ChatroomServerInterface');

class Chatroom
{
	constructor(hostname)
	{
		this.hostname = hostname;
		this.csi = new ChatroomServerInterface(hostname);
		this.auth = this.randomAuth();
	}

	randomAuth()
	{
		var length = 30;
		var result = "";
		var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var charactersLength = characters.length;
		for(var i = 0; i < length; i++)
		{
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	
	changeIdentity()
	{
		this.auth = this.randomAuth();
	}

	print()
	{
		console.log();
		console.log("Chatroom object:");
		console.log("- hostname: " + this.hostname);
		console.log();
	}

	sendMessage(chatroom, message, callback)
	{
		this.csi.sendToServer(
		{"type" : "sendMessage", "auth" : this.auth, "message" : message, "chatroom" : chatroom},
		function (body)
		{
			console.log("STATUS OF MESSAGE SENT TO " + chatroom +":");
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
		this.csi.sendToServer(
		{"type" : "getAllMessages", "auth" : this.auth, "chatroom" : chatroom},
		function (body)
		{
			console.log("MESSAGES IN CHATROOM " + chatroom + ":");
			if(body.status == 1)
			{
				body = body.data;
				for(var i = 0; i < body.length; i++)
				{
					var thisOne = body[i];
					console.log(thisOne.user + ": (" + thisOne.time + ") " + thisOne.message);
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
		{"type" : "getAllChatroomNames", "auth" : this.auth},
		function (body)
		{
			console.log("ALL AVAILABLE CHATROOMS:");
			if(body.status == 1)
			{
				body = body.data;
				for(var i = 0; i < body.length; i++)
				{
					var thisOne = body[i];
					console.log(thisOne);
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
