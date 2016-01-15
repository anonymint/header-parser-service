'use stricts';

var path = process.cwd();
var Controller = require(path + '/app/controller/parserController.js');
var parserController = new Controller();


module.exports = function(app) {

	app.route('/')
		.get(function(req, res){
			res.sendFile(path + "/public/index.html");
		});

	app.route('/whoami')
		.get(function(req, res){
			res.json(parserController.process(req));
		});
};