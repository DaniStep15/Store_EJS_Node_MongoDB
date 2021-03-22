const { Schema, model } = require('mongoose')

const note = new Schema({
  title: {
    type: String,
    required: true,
  },
})

module.exports = model('Note', note)
