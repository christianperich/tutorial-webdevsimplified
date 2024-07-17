const express = require('express');
const router = express.Router();
const Author = require('../models/author')

//All authors
router.get('/', async (req, res) => {
  let searchOptions = {}

  if(req.query.name != null && req.query !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }

  const authors = await Author.find(searchOptions)
  res.render('authors/index', { authors, searchQuery: req.query })
})


// New Author
router.get('/new', (req, res) => {
  res.render('authors/new')
})


//Create author
router.post('/', async (req, res) => {
  const name = req.body.name

  try {
    const newAuthor = new Author({
      name: name
    })

    await newAuthor.save();
    res.redirect('authors')

  } catch(err) {
    
    res.render('authors/new', { errorMessage: 'Error al crear el autor' })

  }

})

module.exports = router;