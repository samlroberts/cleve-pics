var express    = require('express');
var handlebars = require('express-handlebars');
var getImages  = require('./twitter.js')
// var app = express();
// var io = require('socket.io')(app);

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var testImages = [ {url:'http://pbs.twimg.com/media/CC5xUEgUIAEjAo3.jpg'},
	{url:'http://pbs.twimg.com/media/CC5MogZW4AAZfmu.jpg'},
	{url:'http://pbs.twimg.com/media/CC5xUEgUIAEjAo3.jpg'},
	{url:'http://pbs.twimg.com/media/CC6ARAoW0AADQXE.jpg'},
	{url:'http://pbs.twimg.com/media/CC5xUEgUIAEjAo3.jpg'},
	{url:'http://pbs.twimg.com/media/CC5MogZW4AAZfmu.jpg'},
	{url:'http://pbs.twimg.com/media/CC5m4oTWIAEm0kf.jpg'} ]

app.get('/', function (req, res) {
	getImages(function(imageObject){
		console.log(imageObject)
			res.render('home',{images:imageObject});
	});
});
 
server.listen(process.env.PORT || 8080)
console.log('listening on port '+ (process.env.PORT || 8080));

io.on('connection', function (socket) {
	console.log('new connection');
	socket.emit('initialImages', testImages);
});

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
		var imageURL = null;
		if(tweet.entities && tweet.entities.media && tweet.entities.media[0].media_url){
			imageURL = tweet.entities.media[0].media_url;
		}
		io.emit('newImage',{tweet:tweet,url:imageURL});
	});

	stream.on('error', function(error) {
		console.log(error);
	});
});