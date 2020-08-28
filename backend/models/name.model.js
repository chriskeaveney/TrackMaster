const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const nameSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});

const Name = mongoose.model('Name', nameSchema);

module.exports = Name;
