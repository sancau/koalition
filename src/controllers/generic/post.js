
'use strict';

function post(collection) {
  return function *(next) {
    try {
      let entity = new collection.model(this.request.body);
      let document = yield entity.save()

      this.body = yield collection.model
        .findById(document._id)
        .populate(collection.populate || []);

      this.status = 201;
    } 
    catch (err) {
      console.error(err);
      if (err.name === 'ValidationError') {
        this.body = err.errors;
        this.status = 400;
      }
      else {
        console.error(err);
        this.status = 500;
      }
    }
  }
};

module.exports = post;