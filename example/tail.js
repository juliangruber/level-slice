var slice = require('..');
var level = require('level');
var insertWords = require('./_insert');

var db = level(__dirname + '/tail-db');

insertWords(db, function () {
	var words = slice(db, 'words');
	words.slice(-10).on('data', console.log);
});
