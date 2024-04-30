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


app.get('/', (req, res)=>{
    res.render('index.ejs')
})

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})