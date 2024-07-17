const mongoose = require('mongoose');
const Schema = mongoose.Schema

const authorsSchema = new Schema({
  name: {type: String, required: true}
})

module.exports = mongoose.model('Author', authorsSchema)