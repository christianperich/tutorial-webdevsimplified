const mongoose = require('mongoose');
const Schema = mongoose.Schema

const booksSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  description: {
    type: String, 
    required: true
  },
  publishDate: {
    type: Date, 
    required: true
  },
  pageCount: {
    type: Number, 
    required: true
  },
  createdAt: { 
    type: Date, 
    required: true, 
    default: Date.now 
  },
  coverImage: { 
    type: String, 
    required: true 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, ref: 'Author' }
})

module.exports = mongoose.model('Book', booksSchema)