
'use strict';

function getAll(collection) {
  return function *(next) {
    try { 
      this.body = yield collection.model
        .find({})
        .populate(collection.populate || []); 
    } 
    catch (err) {
      console.error(err);
      this.status = 500;
    }
  }
};

module.exports = getAll;