const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controlers/register');
const signin = require('./controlers/signin');
const profile = require('./controlers/profile');
const image = require('./controlers/image');

const db = knex({
    client: 'pg',
    // connection: {
    //     connectionString: process.env.DATABASE_URL,
    //     ssl: true
    // }
    connection: {
        host : '127.0.0.1',
        user : 'susan',
        password : 'test',
        database : 'smartbrain'
    }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res)=>{res.send('it is working')});
app.post('/signin', signin.handleSignin(db,bcrypt));
app.post('/register', register.handleRegister(db,bcrypt));
app.get('/profile/:id', profile.handleProfile(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleApiCall(db));

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app is running on port ${process.env.PORT}`);
})

//testing
module.exports = app;