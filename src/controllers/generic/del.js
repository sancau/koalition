
'use strict';

function del(collection) {
  return function *(next) {
    try {
      let id = this.params.id;
      let document = yield collection.model.findById(id);
      if (!document) {
        this.status = 404;
      }
      else {
        yield document.remove();
        this.status = 204
      }
    } 
    catch (err) {
      console.error(err);
      this.status = 500;
    }
  }
};

module.exports = del;