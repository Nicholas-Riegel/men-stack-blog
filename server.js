const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const port = 3000

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', ()=>{
    console.log(`Connected to MongoDB on ${mongoose.connection.name}`);
})

// GET	/blog	Read	index	Display a list of all posts.

app.get('/blog', (req, res)=>{
    res.render('index.ejs')
})

// GET	/blog/new	Read	new	Show a form to add a new post.
app.get('/blog/new', (req, res)=>{
    res.render('new.ejs')
})

// POST	/blog	Create	create	Add a new post to the list.

// GET	/blog/:id	Read	show	Display a specific post’s details.

// GET	/blog/:id/edit	Read	edit	Show a form to edit an existing post’s details.

// PUT	/blog/:id	Update	update	Update a specific post’s details.

// DELETE	/blog/:id	Delete	delete	Remove a specific post from the list.

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})