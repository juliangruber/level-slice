var os = require('os');
var fs = require('fs');
var store = require('level-store');
var split = require('split');

module.exports = function insertWords (db, cb) {
  var wordsPath = os.platform() == 'sunos'
    ? '/usr/share/lib/dict/words'
    : '/usr/share/dict/words';

  fs.createReadStream(wordsPath)
    .pipe(split(function (word) {
      if (word != '') return word;
    })) // split by "\n"
    .pipe(store(db, { index: 'chunks' }).createWriteStream('words'))
    .once('close', cb);
}
