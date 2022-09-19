const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./Models/Photo');

const app = express();
const PORT = 3000;

// Connect DB
mongoose.connect('mongodb://localhost/photo-catalog', {
    useNewUrlParser : true,
    useUnifiedTopology : true 
})

// Template Engine 
app.set("view engine", "ejs");

// request ve response arasında olan herşey bir middlewaredir. Routes lar da dahil
// middleware yazdıktan sonra diğer middleware geçmek için (req, res, next) next() yazılmalıdır.
// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Routes
app.get('/', async (req,res) => {
    const photos = await Photo.find({}); 
    res.render('index', {
        photos
    })
});

app.get('/about', (req,res) => {
    res.render('about')
});

app.get('/add', (req,res) => {
    res.render('add')
});

app.post('/photos', async (req,res) => {
    await Photo.create(req.body);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda başlatıldı...`);
});
