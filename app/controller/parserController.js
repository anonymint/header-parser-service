'use Strict';

var WhoAmI = function() {
	this.getMe = function(ipaddress, lang, os) {
		return {
			"ipaddress" : ipaddress || 'null',
			"language" : lang || 'null',
			"software" : os || 'null'
		}
	}
}

function Controller() {
	this.process = function(req) {
		var ip,lang,os;

		//get ip
		ip = req.header('x-forwarded-for') || req.connection.remoteAddress;	
		
		//get lang
		if (/(.*),.*/.test(req.header('accept-language'))) {
			lang = /(.*),.*/.exec(req.header('accept-language'))[1];
		}		

		//get os
		if ((/.*?\((.*?)\)/g).test(req.header('user-agent'))) {
			var os = (/.*?\((.*?)\)/g).exec(req.header('user-agent'))[1] ;
		}		

		var whoAmI = new WhoAmI();
		return whoAmI.getMe(ip,lang,os);
	}
}

module.exports = Controller;