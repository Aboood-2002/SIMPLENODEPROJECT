const express = require('express')//server framework
const app = express()//to run a server
const mongoose = require('mongoose') //database
const Product = require('./productmodel')//schema for database
const path = require('path');//to link html pages with server



app.use(express.json())//to display html pages on server
app.use(express.urlencoded({extended: false}))



app.get('/shop/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/shop/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})







//routes
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + 'images'));


app.use(express.static('public'));
app.use('/images', express.static('images'));




app.get('/home', async(req, res) => {
    res.sendFile(path.join(__dirname,'public','onlineshop.html'));

});



//men
app.get('/home', async(req, res) => {
    res.redirect('/men')
});

app.get('/men', async(req, res) => {
    res.sendFile(path.join(__dirname,'public','men.html'));

});

//women
app.get('/home', async(req, res) => {
    res.redirect('/women')
});


app.get('/women', async(req, res) => {
    res.sendFile(path.join(__dirname,'public','women.html'));
});

//kids
app.get('/home', async(req, res) => {
    res.redirect('/kids')
});


app.get('/kids', async(req, res) => {
    res.sendFile(path.join(__dirname,'public','kids.html'));
});


//to connect to mongodb
mongoose.
connect('mongodb://0.0.0.0:27017/shop')
.then(() => {
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log(error)
})

//to run the server
app.listen(8080, ()=> {
    console.log(`server is opened`)
});