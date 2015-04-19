var express    = require('express');
var handlebars = require('express-handlebars');
var getImages  = require('./twitter.js')
var app = express();

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
 
app.listen(3000)
console.log('listening on port 3000')