'use Strict';

var WhoAmI = function() {
	this.getMe = function(ipaddress, lang, os) {
		return {
			"ipaddress" : ipaddress,
			"language" : lang,
			"software" : os
		}
	}
}

function Controller() {
	this.process = function(req) {
		//get ip
		var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;	
		//get lang
		var lang = /(.*),.*/.exec(req.header('accept-language'))[1];

		//get os
		var os = (/.*?\((.*?)\)/g).exec(req.header('user-agent'))[1];

		var whoAmI = new WhoAmI();
		return whoAmI.getMe(ip,lang,os);
	}
}

module.exports = Controller;