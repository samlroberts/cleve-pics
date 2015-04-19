var request = require('request')
var twitter_api = 'https://api.twitter.com/1.1/';
var consumer_key    = '0KDTbTS5fvEZGorYg5kPoCNeL';
var consumer_secret = 'YuS1QJiS4sRfYQbfbgr1jxHmXq8awcnY8Rf0H5NVr3kE45FACF';

var options = {
  url: 'https://api.twitter.com/1.1/search/tweets.json?q=%23happyincle&src=typd&mode=photos',
  headers: {
    Authorization: 'OAuth oauth_consumer_key="DC0sePOBbQ8bYdC8r4Smg",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1429397662",oauth_nonce="1600163735",oauth_version="1.0",oauth_token="7956002-GZBErfwi0j70kxLqZ6XSTZ8pPesuuhwlYJDRO52oAu",oauth_signature="fO12lS%2BCRlRU6FUSQk5H859imDE%3D"',
    Host:'api.twitter.com',
    'X-Target-URI':'https://api.twitter.com',
    Connection:'Keep-Alive'
  }
};
 
function callback(error, response, body) {
	var output = [];
	if (!error && response.statusCode == 200) {
		var info = JSON.parse(body);
		// console.log(info.statuses.length);
		for (var i = 0; i < info.statuses.length; i++) {
			debugger;
			if(info.statuses[i].entities && info.statuses[i].entities.media && info.statuses[i].entities.media[0].media_url){
				output.push(info.statuses[i].entities.media[0].media_url)
			}
		}
		console.log(output.length)
	} else {
		console.log(response)
	}
}
 
request(options, callback);