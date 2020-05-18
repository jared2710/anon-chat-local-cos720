var ChatroomServerInterface = require('./ChatroomServerInterface');
var fs = require('fs');

class Chatroom
{
	constructor(hostname)
	{
		this.hostname = hostname;
		this.csi = new ChatroomServerInterface(hostname);
		this.auth = this.retrieveStoredAuth();
	}

	randomAuth()
	{
		var length = 50;
		var result = "";
		var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var charactersLength = characters.length;
		for(var i = 0; i < length; i++)
		{
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	jsonFromIdentityFile()
	{
		var rawdata = fs.readFileSync("identity.json");
		var jsonOfFile = JSON.parse(rawdata);
		return jsonOfFile;
	}

	jsonToIdentityFile(json)
	{
		var toWrite = JSON.stringify(json);
		fs.writeFileSync("identity.json", toWrite);
	}

	retrieveStoredAuth()
	{
		var json = this.jsonFromIdentityFile();
		if(json.identity == "")
		{
			json.identity = this.randomAuth();
			this.jsonToIdentityFile(json);
		}
		return json.identity;
	}
	
	changeIdentity()
	{
		var json = this.jsonFromIdentityFile();
		json.identity = this.randomAuth();
		this.jsonToIdentityFile(json);
		this.auth = json.identity;
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
		this.csi.sendToServer(
		{"type" : "getAllMessages", "auth" : this.auth, "chatroom" : chatroom},
		function (body)
		{
			console.log("MESSAGES IN CHATROOM \x1b[93m" + chatroom + "\x1b[0m:");
			if(body.status == 1)
			{
				body = body.data;
				for(var i = 0; i < body.length; i++)
				{
					var thisOne = body[i];
					console.log("\x1b[94m" + thisOne.user + "\x1b[0m: \x1b[37m(" + thisOne.time + ")\x1b[0m " + thisOne.message);
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
