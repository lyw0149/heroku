var webpack = require('webpack')
// var webpackDevMiddleware = require('webpack-dev-middleware')
// var webpackHotMiddleware = require('webpack-hot-middleware')
var bodyParser = require("body-parser")
var request = require('request')
var http = require('http')
var ejs = require('ejs')

var app = new(require('express'))()
var port = 8080

// var compiler = webpack(config)
// app.use(webpackDevMiddleware(compiler, {
// 	noInfo: true,
// 	publicPath: config.output.publicPath
// }))
// app.set('view engine', 'ejs')
// app.use(webpackHotMiddleware(compiler))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	res.sendFile(__dirname + '/src/index.html')
})
app.get("/welcome", function (req, res) {
	res.redirect('/');
})


//temporary global variable for store user visit data.
var visitData = {}


//for get accessToken from client -> save to Buffer (devide user)
//params : accessToken, userID
app.post('/welcome', function (req, res) {

	//console.log(req.body);
	var accessToken = req.body.accessToken;
	var userID = req.body.userID;
	var options = {
		url: 'https://graph.facebook.com/' + userID + '?access_token=' + accessToken,
		headers: {
			'User-Agent': 'request'
		}
	};
	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {

			var userData = JSON.parse(body);

			if(visitData[userData.id] == null){
				visitData[userData.id] =1;
			}else{
				visitData[userData.id] ++;
			}
			console.log(visitData);

			res.send( "<div> Hello,"+ userData.name+", <br>" + "You have visited "+ visitData[userData.id] +" times today. </div>");
		}
	}
	request(options, callback);

})
//-----end of POST /FBAT


//start server
app.listen(process.env.PORT || 3000, function (error) {
	if (error) {
		console.error(error)
	} else {
		console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", process.env.PORT || 3000, process.env.PORT || 3000)
	}
})
