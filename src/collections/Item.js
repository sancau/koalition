
'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let itemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, min: 0, default: 0 },
  category: { type: Schema.Types.ObjectId, ref: 'category', required: true }
});

module.exports = {
  model: mongoose.model('item', itemSchema),
  populate: ['category']
};
 