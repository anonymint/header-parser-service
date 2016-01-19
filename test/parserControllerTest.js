'use stricts'

var path = process.cwd();
var Controller = require(path + '/app/controller/parserController.js');
var parserController = new Controller();
var assert = require('assert');

//assert nothing in req
var req = {};


//Mock header Mac machine user-agent request
req['header']={};
req.header = function(val) {
    switch (val) {
        case 'x-forwarded-for': return '192.168.2.1'; break;
        case 'accept-language': return 'en-US,en;q=0.8';break;
        case 'user-agent': return 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36';break;
        default : return 'null'; break;
    }
}

assert.deepEqual(
    { ipaddress: '192.168.2.1',
    language: 'en-US',
    software: 'Macintosh; Intel Mac OS X 10_11_2' }
    ,parserController.process(req));

//Mock header Window machine user-agent request
req['header']={};
req.header = function(val) {
    switch (val) {
        case 'x-forwarded-for': return '192.168.2.1'; break;
        case 'accept-language': return 'en-US,en;q=0.8';break;
        case 'user-agent': return 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36';break;
        default : return 'null'; break;
    }
}

assert.deepEqual(
    { ipaddress: '192.168.2.1',
    language: 'en-US',
    software: 'Windows NT 6.1; WOW64' }
    ,parserController.process(req));

