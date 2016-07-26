# koalition

Extendable Koa based REST API application made easy. 

This code exposes an easy and extendable way to build a basic REST API service application based on Koa, Mongoose and Bluebird. It's SMALL, free from callbacks, easy to read and change.

# Getting started

1. cloooone :) 
2. npm install
3. Run 'npm run server' with arguments:
   - <desired PORT> (required argument) 
   - <database name> (required argument) 
   - <MongoDB url> (optional argument, default is mongodb://localhost:27017)
   
  Example 'npm run server 2500 mydb'

4. That's it

# Defining your own API endpoints

By default there application consists of 2 demo endpoints just to show how it works.

To define an endpoint there are 2 short steps:

1. Define a mongo collection within collections. Each collection should expose an object that contains mongoose model and optionaly a list of fields to populate embedded objects in the API responses.
2. Define the enpoint in ./endpoints.js pointing out url, router and collection to use.
3. Done. Restart server and your custom enpoint is up and ready for standart CRUD operations.

