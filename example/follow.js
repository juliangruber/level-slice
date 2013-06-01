var slice = require('..');
var level = require('level');
var store = require('level-store');

var db = level(__dirname + '/db');

var ws = store(db, { index: 'chunks'}).createWriteStream('words');

var words = slice(db, 'words');
words.follow(-10).on('data', console.log);

ws.write('foo');
ws.write('bar');
ws.end();
