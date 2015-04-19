var request = require('request')
var twitter_api = 'https://api.twitter.com/1.1/';
var consumer_key        = 'Pa1IpwxdqsAO6PNEHXceY1oib';
var consumer_secret     = 'Dw9XzqKBk7jh1baqVTr6LzsqeV3oKl0dTWFgQERMIp8okNXC1V';
var access_token = 'AAAAAAAAAAAAAAAAAAAAAG07fQAAAAAABuhm%2FwUfhCgV%2FbykVEqEhDTtdIc%3DanUC7ZRsGwpGbZNaiEeZ75DiWPMWIuzScW7A6xqvIoHdy1IYqN';
// var access_token_secret = 'jvgUgHf7kbqu4qNyITqi57qGcdspb1HSGdCuNl66plEh7';


// var auth = consumer_key + ":" + consumer_secret;
// console.log(auth);
// auth = new Buffer(auth).toString("base64");
// console.log(auth);

// var requestObject = {
// 	url:'https://api.twitter.com/oauth2/token',
// 	method: 'POST',
// 	headers:{
// 		'Authorization': 'Basic '+auth,
// 		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
// 	},
// 	body:'grant_type=client_credentials'
// 	}

// console.log(requestObject);
// request(requestObject,function(error,response,body){
// 	if (!error && response.statusCode == 200) {
// 		var data = JSON.parse(body);
// 		console.log(data);
// 		access_token = data.access_token
// 		request(options, callback);
// 	} else {
// 		console.log(response);
// 	}
// });

var options = {
  url: 'https://api.twitter.com/1.1/search/tweets.json?q=%23happyincle&src=typd&mode=photos',
  headers: {
    Authorization: 'Bearer '+access_token,
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
		console.log(output)
	} else {
		console.log(response)
	}
}
 

// request(options,callback)

var testImages = [ 'http://pbs.twimg.com/media/CC5xUEgUIAEjAo3.jpg',
  'http://pbs.twimg.com/media/CC5MogZW4AAZfmu.jpg',
  'http://pbs.twimg.com/media/CC5xUEgUIAEjAo3.jpg',
  'http://pbs.twimg.com/media/CC6ARAoW0AADQXE.jpg',
  'http://pbs.twimg.com/media/CC5xUEgUIAEjAo3.jpg',
  'http://pbs.twimg.com/media/CC5MogZW4AAZfmu.jpg',
  'http://pbs.twimg.com/media/CC5m4oTWIAEm0kf.jpg' ]