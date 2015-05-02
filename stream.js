var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: 'Pa1IpwxdqsAO6PNEHXceY1oib',
	consumer_secret: 'Dw9XzqKBk7jh1baqVTr6LzsqeV3oKl0dTWFgQERMIp8okNXC1V',
	access_token_key: '7956002-5AwpgyFeYxM18iusCxJLxK1p3kC4i0HMtzYKe5fNVz',
	access_token_secret: 'jvgUgHf7kbqu4qNyITqi57qGcdspb1HSGdCuNl66plEh7',
});

/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
 var hashTags= [
	'#happyincle',
	'#cle',
	'#thisiscle',
	'#allincle'
]

client.stream('statuses/filter', {track: hashTags.join(',')},  function(stream){
	stream.on('data', function(tweet) {
		console.log(tweet.text);
	});

	stream.on('error', function(error) {
		console.log(error);
	});
});