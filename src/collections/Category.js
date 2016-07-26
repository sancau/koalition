
'use strict';

const mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = {
  model: mongoose.model('category', categorySchema)
};
 