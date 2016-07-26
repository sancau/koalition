
'use strict';

function getOne(collection) {
  return function *(next) {
    try { 
      this.body = yield collection.model
        .findById(this.params.id)
        .populate(collection.populate || []); 
    } 
    catch (err) {
      console.error(err);
      this.status = 500;
    }
  }
};

module.exports = getOne;