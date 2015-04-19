var express    = require('express');
var handlebars = require('express-handlebars');
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
    res.render('home',{images:testImages});
});
 
app.listen(3000)
console.log('listening on port 3000')