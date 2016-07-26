
'use strict';

function put(collection) {
  return function *(next) {
    try {
      let id = this.params.id;
      let data = this.request.body;
      let document = yield collection.model.findById(id);        
      if (document) {
        for (let key in data) {
          document[key] = data[key];
        }
        yield document.save();
        let updated = yield collection.model
          .findById(id)
          .populate(collection.populate || []);
        this.body = updated;
        this.status = 200;
      }
      else {
        this.status = 404;
      }
    } 
    catch (err) {
      console.error(err);
      if (err.name === 'ValidationError') {
        this.body = err.errors;
        this.status = 400;
      }
      else {
        this.status = 500;
      }
    }
  }
};

module.exports = put;