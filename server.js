
var app = new(require('express'))()
var port = 8000
app.get("/", function (req, res) {
	res.sendFile(__dirname + '/index.html')
})
// http.listen(process.env.PORT || 3000, function(){
//   console.log('listening on', http.address().port);
// });
app.listen(process.env.PORT || 3000, function (error) {
	if (error) {
		console.error(error)
	} else {
		console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", process.env.PORT || 3000, process.env.PORT || 3000)
	}
})
