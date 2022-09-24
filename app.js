const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const photoControler = require('./Controllers/photoControllers');
const pageControllers = require('./Controllers/pageControllers');

const app = express();
const PORT = 3000;

// Connect DB
mongoose.connect('mongodb://localhost/photo-catalog', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    //useFindAndModify : false
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
app.use(methodOverride('_method', {
    methods: ['POST' ,'GET']
}));

// Routes
app.get('/', photoControler.getAllPhotos);
app.get('/photos/:id', photoControler.getPhoto);
app.post('/photos', photoControler.createPhoto);
app.put('/photos/:id', photoControler.updatePhoto);
app.delete('/photos/:id', photoControler.deletePhoto);
app.get('/about', pageControllers.getAboutPage);
app.get('/add', pageControllers.getAddPage);
app.get('/photos/edit/:id', pageControllers.getEditPage);

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda başlatıldı...`);
});
