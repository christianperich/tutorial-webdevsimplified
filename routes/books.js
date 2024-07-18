const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');

//Multer config
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/covers');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const isValid = imageMimeTypes.includes(file.mimetype);
    callback(null, isValid);
  }
});



//All books
router.get('/', async (req, res) => {
  let searchOptions = {}
  
  if (req.query.name != null && req.query.name !== '') {
    const regex = new RegExp(req.query.name, 'i');
    searchOptions = {
      $or: [
        { name: regex },
        { 'author.name': regex }
      ]
    };
  }

  const books = await Book.aggregate([{
    $lookup: {
      from: 'authors', 
      localField: 'author',
      foreignField: '_id',
      as: 'author'
    }
  },
  {
    $unwind: '$author' 
  },
  {
    $match: searchOptions 
  }])

  
  res.render('books/index', { books, searchQuery: req.query })
})


// New book
router.get('/new', async (req, res) => {
  const locals = {
    title: 'Ingresar nuevo libro'
  }

  const book = {}
  const authors = await Author.find()
  res.render('books/new', {authors, book, locals})
})

//Book Details
router.get('/:id', async (req, res) => {
  
  const id = req.params.id;
  const book = await Book.findById(id).populate('author')

  const locals = {
    title: book.name
  }

  console.log(book)

  res.render('books/details', { book, locals })
})


//Create book
router.post('/', upload.single('cover'), async (req, res) => {
  const fileName = req.file != null ? `/img/covers/${req.file.filename}` : null;

  const { name, author, description, publishDate, pageCount } = req.body


  try {
    const newBook = new Book({
      name: name,
      description: description,
      publishDate: publishDate,
      pageCount: pageCount,
      author: author,
      coverImage: fileName
    })

    await newBook.save();
    res.redirect('books')

  } catch(err) {

    console.log('Error al agregar libro')

    const locals = {
      title: 'Ingresar nuevo libro',
      errorMessage: 'No se pudo agregar el libro'
    }
  
    const book = {}
    const authors = await Author.find()
    res.render('books/new', { authors, book, locals  })

  }

})

module.exports = router;