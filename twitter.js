var request = require('request');
var queryString = require('querystring');
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
// 
var hashTags= [
	'#happyincle',
	'#cle',
	'#thisiscle',
	'#allincle'
]
var searchTerm = queryString.escape(hashTags.join(' OR '));
var api_base = 'https://api.twitter.com/1.1/search/tweets.json'

var options =function(data){
	return {
		url: api_base+data,
		headers: {
			Authorization: 'Bearer '+access_token,
			Host:'api.twitter.com',
			'X-Target-URI':'https://api.twitter.com',
			Connection:'Keep-Alive'
		}
	};
}
var initialOptions = options('?q='+searchTerm+'&src=typd&mode=photos')

module.exports = function(numWanted,cb){
	var finalOutput = [];
	request(initialOptions,requestCallback(searchCallback(cb)));

	function searchCallback(cb){
		return function(output,next_results){
			finalOutput = finalOutput.concat(output);
			if(finalOutput.length < numWanted){
				// console.log('still need %s',numWanted)
				request(options(next_results),requestCallback(searchCallback(cb)));
			} else {
				// console.log('have %s',numWanted)
				cb(finalOutput)
			}
		}
	}


	// create the proper request callback that parses data and finds images
	function requestCallback(callback){
		return function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);
				var output = findImages(info)
				// console.log('found %s images',output.length);
				callback(output,info.search_metadata.next_results);
			} else {
				console.log(response)
				callback(null);
			}
		}
	}

	// actually sort out the images
	function findImages(info,callback){
		var output = [];
		// console.log('got %s tweets',info.statuses.length);
		for (var i = 0; i < info.statuses.length; i++) {
			if(info.statuses[i].entities && info.statuses[i].entities.media && info.statuses[i].entities.media[0].media_url){
				output.push({
					tweet:info.statuses[i],
					url:info.statuses[i].entities.media[0].media_url
				});
			}
		}
		return output
	}
}