var TorNetworkInterface = require('./TorNetworkInterface');

class ChatroomServerInterface
{
	constructor(hostname)
	{
		this.hostname = hostname;
		this.tor = new TorNetworkInterface();
	}

	print()
	{
		console.log();
		console.log("ChatroomServerInterface object:");
		console.log("- hostname: " + this.hostname);
		console.log();
	}

	sendToServer(data, callback)
	{
		this.tor.sendToServer(this.hostname, data, callback);
	}

	
}

module.exports = ChatroomServerInterface;
