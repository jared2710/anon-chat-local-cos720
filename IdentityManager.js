var fs = require('fs');
var crypto = require('crypto');

class IdentityManager
{
	constructor()
	{
	}

	print()
	{
		console.log("IdentityManager object");
	}

	auth()
	{
		var auth = this.retrieveStoredAuth();
		return auth;
	}

	pseudonym()
	{
		var auth = this.auth();
		var pseudonym = this.authToPseudonym(auth);
		return pseudonym;
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
	}
	
}

module.exports = IdentityManager;




