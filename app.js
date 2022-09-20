const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
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
app.use(fileUpload());

// Routes
app.get('/', async (req,res) => {
    const photo = await Photo.find({}).sort('-dateCreated'); 
    res.render('index', {
        photo
    })
});


app.get('/photos/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo
    })
});

app.get('/about', (req,res) => {
    res.render('about')
});

app.get('/add', (req,res) => {
    res.render('add')
});

app.post('/photos', async (req,res) => {
    const uploadDir = 'public/uploads';

    if(!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/public/uploads/' + uploadImage.name

    uploadImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image : '/uploads/' +  uploadImage.name
        })
    });
    res.redirect('/');  
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda başlatıldı...`);
});
