
'use strict';

const routers = require('./routers');
const collections = require('./collections');

const baseUrl = '/api';

const endpoints = {
  
  categories: {
    url: `${baseUrl}/categories`,
    router: routers.generic.crud,
    collection: collections.Category
  },
  
  items: {
    url: `${baseUrl}/items`,
    router: routers.generic.crud,
    collection: collections.Item
  }

};

module.exports = endpoints;