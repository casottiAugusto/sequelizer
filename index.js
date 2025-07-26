const express = require('express');
const conn = require('./db/config.js');
const hbs = require('express-handlebars');
const app =express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.engine('handlebars', hbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});