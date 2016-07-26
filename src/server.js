
'use strict';

///////////////////////////////////////////////////////////////////////////////

const PORT = process.argv[2];
if (!PORT) {
  throw Error('Server PORT was not passed ... ABORTING'); 
}

const DATABASE_NAME = process.argv[3];
  if (!DATABASE_NAME) {
    throw Error('Database name was not passed ... ABORTING'); 
}

const MONGO_URL = process.argv[4] ? `${process.argv[4]}/${DATABASE_NAME}` : 
                    `mongodb://localhost:27017/${DATABASE_NAME}`;

const koa = require('koa'),
      koaBody = require('koa-body'),
      mongoose = require('mongoose'),
      bluebird = require('bluebird'),
      colors = require('colors');

const middleware = require('./middleware'),
      endpoints = require('./endpoints');


///////////////////////////////////////////////////////////////////////////////
// global promise rejection handler
// in case we don't have a catcher in place
// a rejected promise will be handled globaly

process.on("unhandledRejection", (reason, promise) => {
  console.log(reason.red);
  console.log('ATTENTION. A promise rejection global catch.'.yellow);
  console.log('An error handler might be missing somewhere.'.yellow);
});


///////////////////////////////////////////////////////////////////////////////

mongoose.Promise = bluebird;
mongoose.connect(MONGO_URL)
.then(
  () => {
    console.log('Database connection estabished ... OK'.green);
    try {
      const app = koa();
      app.use(koaBody({formidable:{uploadDir: __dirname + '/uploads'}}));

      // plug in all the application level middleware
      for (let item in middleware) {
        console.log(`Starting ${item} middleware ... INFO`.blue);
        app.use( middleware[item] );
        console.log(`${item} middleware up and running ... OK`.green);
      } 

      // plug in all the endpoints
      for (let item in endpoints) {
        console.log(`Starting ${item} endpoint ... INFO`.blue);
        let endpoint = endpoints[item];
        let router = endpoint.router(endpoint.url, endpoint.collection);
        app.use(router.routes());
        app.use(router.allowedMethods());
        console.log(`Endpoint ${endpoint.url} up and running ... OK`.green);
      }
      console.log('Starting server ... INFO'.blue);
      app.listen(PORT, () => 
        console.log(`Listening on port ${PORT} ... OK`.green));
    } 
    catch (err) {
      console.error(`${err} ... ERROR`.red);
    }
  },
  (err) => console.error(`Connection error: ${err.message} ... ERROR`.red)
);
