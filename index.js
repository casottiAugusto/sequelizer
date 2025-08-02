const express = require('express');
const conn = require('./db/config.js');
const hbs = require('express-handlebars');
const app =express();
const User = require('./model/User.js');
const Adress = require('./model/Adress.js');

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
app.post('/users/edit', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;   
    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }   
    const dataUpdate = {
        id,
        name,
        occupation,
        newsletter 
    }   
    await User.update(dataUpdate, { where: { id: id } });
    res.redirect('/');});

app.post("/address/create", async (req, res) => {
  const street = req.body.street;
  const Number = req.body.number;
  const city = req.body.city;
  const userId = req.body.userId;
  const address = {
    street,
    Number,
    city,
    UserId: userId,
  };
  console.log(address);
  await Adress.create(address);
  res.redirect(`/users/edit/${userId}`);
});


app.get('/',async (req, res) => {
    const users=await User.findAll({raw: true});
    
    res.render('home',{users:users});
});

app.get('/users/:id', async (req, res) => {
     const id = req.params.id;
  const user = await User.findOne({ raw: true, where: { id: id } });
 
 
  res.render('userview',{user});
});



conn
.sync()
  //  .sync({ force: false }) // Use force: true to drop and recreate the table   
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        app.listen(`${port}`, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((error) => {
        console.error('Erro ao conectar ao banco de dados:', error);
    });
