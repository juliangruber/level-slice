var slice = require('..');
var level = require('level');
var insertWords = require('./_insert');

var db = level(__dirname + '/slice-reverse-db');

insertWords(db, function () {
	var words = slice(db, 'words');
	words.sliceReverse(-10).on('data', console.log);
});
