var Store = require('level-store');
var tmpStream = require('tmp-stream');

module.exports = Slice;

function Slice (db, key) {
	if (!(this instanceof Slice)) return new Slice(db, key);
	this.store = Store(db, { index: 'chunks' });
	this.key = key;
}

Slice.prototype.slice = function (start, end) {
	if (typeof start == 'undefined') start = 0;
	if (typeof end == 'undefined') end = 0;

	return start >= 0
		? this._read(start, end)
		: this._readReverse(start, end);
};

Slice.prototype._read = function (start, end) {
	return this.store.createReadStream(this.key, {
		gte: start,
		lt: end
	});
};

Slice.prototype._readReverse = function (start, end) {
  var self = this;
  var tmp = tmpStream();

  self.store.head(self.key, { index: true }, function (err, chunk) {
    tmp.replace(self.store.createReadStream(self.key, {
      gt: chunk.index + start,
      lte: chunk.index + end
    }));
  });

  return tmp;
};
