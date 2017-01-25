var express = require('express');
var bodyParser = require('body-parser');

var port = (process.env.PORT || '8000');

var app = express();

//parse application/json
app.use(bodyParser.json());   // This is the type of body we're interested in
// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

//connect public folder to server
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});


app.listen(port, function() {
	console.log(' server app is up, listening on', port);
});

