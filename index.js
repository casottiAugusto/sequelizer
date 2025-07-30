const express = require('express');
const conn = require('./db/config.js');
const hbs = require('express-handlebars');
const app =express();
const User = require('./model/User');

const port=3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.engine('handlebars', hbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/users/create', (req, res) => {  
    res.render('adduser');
})
app.post('/users/create', async (req, res) => {
    const  name = req.body.name; 
    const occupation = req.body.occupation;
    let newsletter =req.body.newsletter;

    if(newsletter === 'on') {
        newsletter = true;
    }else {
        newsletter = false;
    }
    console.log(req.body)  ;
   await User.create({name, occupation, newsletter})
   res.redirect('/');

})
app.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id;   
    await User.destroy({where: {id: id}});
    res.redirect('/');
});

app.get('/users/edit/:id', async (req, res) => {    
    const id = req.params.id;
    const user = await User.findOne({ raw: true, where: { id: id } });
    
    res.render("useredi", { user });  
})



app.get('/',async (req, res) => {
    const users=await User.findAll({raw: true});
    
    res.render('home',{users:users});
});

app.get('/users/:id', async (req, res) => {
     const id = req.params.id;
  const user = await User.findOne({ raw: true, where: { id: id } });
 
 
  res.render('userview',{user});
});



conn.sync()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        app.listen(`${port}`, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((error) => {
        console.error('Erro ao conectar ao banco de dados:', error);
    });
