
'use strict';

const koaRouter = require('koa-router');
const controllers = require('../../controllers')

function genericRouter(url, collection) {
  const router = koaRouter();
  router.get(url, controllers.generic.getAll(collection));
  router.post(url, controllers.generic.post(collection));
  router.get(`${url}/:id`, controllers.generic.getOne(collection));
  router.put(`${url}/:id`, controllers.generic.put(collection));
  router.del(`${url}/:id`, controllers.generic.del(collection));
  return router;
}

module.exports = genericRouter;