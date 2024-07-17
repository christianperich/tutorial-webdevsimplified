require('dotenv').config()

const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index')

const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

const connectDB = require('./db/db.js');
connectDB();

app.use('/', indexRouter);

app.listen(PORT, console.log(`http://localhost:${PORT}`))