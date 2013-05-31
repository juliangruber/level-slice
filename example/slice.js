var slice = require('..');
var level = require('level');
var insertWords = require('./_insert');

var db = level(__dirname + '/slice-db');

insertWords(db, function () {
	var words = slice(db, 'words');
	words.slice(0, 5).pipe(process.stdout);
});

