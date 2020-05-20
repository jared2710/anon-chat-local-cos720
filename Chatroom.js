var ChatroomServerInterface = require('./ChatroomServerInterface');
var fs = require('fs');
var crypto = require('crypto');

class Chatroom
{
	constructor(hostname)
	{
		this.hostname = hostname;
		this.csi = new ChatroomServerInterface(hostname);
		this.auth = this.retrieveStoredAuth();
		this.pseudonym = this.authToPseudonym(this.auth);
	}

	jsonFromIdentityFile()
	{
		var rawdata = fs.readFileSync("identity.json");
		var jsonOfFile = JSON.parse(rawdata);
		return jsonOfFile;
	}

	jsonFromNamesFile()
	{
		var rawdata = fs.readFileSync("names.json");
		var jsonOfFile = JSON.parse(rawdata);
		return jsonOfFile;
	}

	jsonToIdentityFile(json)
	{
		var toWrite = JSON.stringify(json);
		fs.writeFileSync("identity.json", toWrite);
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

	sha256(text)
	{
		return crypto.createHash('sha256').update(text).digest('hex');
	}
	
	authToPseudonym(auth)
	{
		var names = this.jsonFromNamesFile();
		//console.log(names);
		//console.log(auth);
		var hash = this.sha256(auth);
		//console.log(hash);
		hash = hash.substring(0, 9);
		//console.log(hash);
		var username = "";
		for(var i = 0; i < 9; i = i + 3)
		{
			//console.log(hash[i]);
			var hex = hash[i] + hash[i+1] + hash[i+2];
			//console.log(hex);

			var pos = parseInt(Number("0x" + hex), 10);
			//console.log(pos);

			pos += (i/3)*16*16*16;
			//console.log(pos);

			var toAdd = names[pos];
			//console.log(toAdd);
			
			username += toAdd + " ";
			//console.log(username);
		}
		return username.substring(0, username.length-1);
	}
	
	changeIdentity()
	{
		var json = this.jsonFromIdentityFile();
		json.identity = this.randomAuth();
		this.jsonToIdentityFile(json);
		this.auth = json.identity;
		this.pseudonym = this.authToPseudonym(this.auth);
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
					console.log("- \x1b[94m" + thisOne.user + "\x1b[0m: \x1b[37m(" + thisOne.time + ")\x1b[0m " + thisOne.message);
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
