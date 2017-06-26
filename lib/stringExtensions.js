'use strict';

module.exports = (function selfFunc () {
  // clean phone numbers and return just a numeric string
  String.prototype.getNumbers = function getnumbers() {
    return this.replace(/[^0-9]/g, '');
  };

  // url part encode
  String.prototype.encodeURLpart = function encodeURLpart(separator = '+') {
    let out = this.replace(/[,\.\-]/g, ' ').replace(/\s+/g, ' ').trim().split(' ');
    for (let key in out) {
      if(key) {
        out[key] = encodeURIComponent(decodeURIComponent(out[key]));
      }
    }
    return out.join(separator);
  };

  // url part decode
  String.prototype.decodeURLpart = function decodeURLpart() {
    return decodeURIComponent(this.replace(/\+/g, ' '));
  };
}());
