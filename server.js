const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const port = 3001
const Post = require('./models/post.js')

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', ()=>{
    console.log(`Connected to MongoDB on ${mongoose.connection.name}`);
})

// GET	/blog	Read	index	Display a list of all posts.
app.get('/blog', async (req, res)=>{
    const allPosts = await Post.find();
    res.render('index.ejs', {allPosts})
})

// GET	/blog/new	Read	new	Show a form to add a new post.
app.get('/blog/new', (req, res)=>{
    res.render('new.ejs')
})

// POST	/blog	Create	create	Add a new post to the list.
app.post('/blog', async (req, res)=>{
    await Post.create({
        title: req.body['post-title'],
        body: req.body['post-body']
    })
    res.redirect('/blog')
})

// GET	/blog/:id	Read	show	Display a specific post’s details.
app.get('/blog/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('show.ejs', {post})
})

// GET	/blog/:id/edit	Read	edit	Show a form to edit an existing post’s details.
app.get('/blog/:id/edit', async (req, res)=>{
    const post = await Post.findById(req.params.id)
    res.render('edit.ejs', {post})
})
// PUT	/blog/:id	Update	update	Update a specific post’s details.
app.put('/blog/:id', async (req, res)=>{
    await Post.findByIdAndUpdate(req.params.id, {
        title: req.body['post-title'],
        body: req.body['post-body']
    })
    res.redirect(`/blog`)
})

// DELETE	/blog/:id	Delete	delete	Remove a specific post from the list.
app.delete('/blog/:id', async (req, res)=>{
    await Post.findByIdAndDelete(req.params.id)
    res.redirect('/blog')
})

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})