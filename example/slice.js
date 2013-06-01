var slice = require('..');
var level = require('level');

var db = level(__dirname + '/db');
var words = slice(db, 'words');
words.slice(0, 5).on('data', console.log);

