var Store = require('level-store');
var tmpStream = require('tmp-stream');

module.exports = Slice;

function Slice (db, key) {
  if (!(this instanceof Slice)) return new Slice(db, key);
  this.store = Store(db, { index: 'chunks' });
  this.key = key;
}

Slice.prototype.slice = function (start, end, reverse, follow) {
  if (typeof start == 'undefined') start = 0;
  if (typeof end == 'undefined') end = 0;

  return start >= 0
    ? this._read(start, end, reverse, follow)
    : this._readReverse(start, end, reverse, follow);
};

Slice.prototype.sliceReverse = function (start, end) {
  return this.slice(start, end, true);
};

Slice.prototype.follow = function (start, end) {
  return this.slice(start, end, false, true);
};

Slice.prototype._read = function (start, end, reverse, follow) {
  return this.store.createReadStream(this.key, {
    gte: start,
    lt: end,
    reverse: reverse,
    live: follow
  });
};

Slice.prototype._readReverse = function (start, end, reverse, follow) {
  var self = this;
  var tmp = tmpStream();

  self.store.head(self.key, { index: true }, function (err, chunk) {
    tmp.replace(self.store.createReadStream(self.key, {
      gt: chunk.index + start,
      lte: chunk.index + end,
      reverse: reverse,
      live: follow
    }));
  });

  return tmp;
};
