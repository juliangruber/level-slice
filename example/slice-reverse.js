var slice = require('..');
var level = require('level');

var db = level(__dirname + '/db');
var words = slice(db, 'words');
words.sliceReverse(-10).on('data', console.log);
