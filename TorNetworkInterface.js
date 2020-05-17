class TorNetworkInterface
{
	constructor()
	{
		this.tr = require('tor-request');
	}

	print()
	{
		console.log("TorNetworkInterface object");
	}

	sendToServer(hostname, data, callback)
	{
		this.tr.request
		({
			url: 'https://' + hostname,
			method: 'POST',
			json: data
		},
		function(err, res, body)
		{
			if(!err)
			{
				if(res.statusCode == 200)
				{
					callback(body);
				}
				else
				{
					console.log("Error with HTML, status code: " + res.statusCode);
					callback(false);
				}
				
			}
			else
			{
				console.log("Error before HTML: " + err);
				callback(false);
			}
		});
	}

	getTorIp()
	{
		this.tr.request('https://api.ipify.org',
		function(err, res, body)
		{
			if(!err)
			{
				if(res.statusCode == 200)
				{
					console.log();
					console.log("TOR IP: " + body);
					console.log();
				}
				else
				{
					console.log();
					console.log("Error with HTML, status code: " + res.statusCode);
					console.log();
				}
				
			}
			else
			{
				console.log();
				console.log("Error before HTML: " + err);
				console.log();
			}
		});
	}

	
}

module.exports = TorNetworkInterface;




