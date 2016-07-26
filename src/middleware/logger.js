
'use strict';

module.exports = function* Logger(next) {
  if (!this.state.start) {
    this.state.start = new Date;
  }
  yield next;
  var ms = new Date - this.state.start;
  console.log(`[${this.method}] responded [${this.status}] in ${ms} ms from url ${this.url}`);
};