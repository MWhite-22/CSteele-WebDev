let request = require("request");
request('http://www.google.com', function(err, res, body){
	if(err){
		console.log("ERROR: Something went wrong");
		console.log(err);
	} else {
		if (res.statusCode == 200){
			console.log(body);
		}
	}
});