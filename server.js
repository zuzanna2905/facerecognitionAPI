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
app.post('/signin', signin.handleSignin(req,res,db,bcrypt));
app.post('/register', register.handleRegister(req,res,db,bcrypt));
app.get('/profile/:id', profile.handleProfile(req,res, db));
app.put('/image', image.handleImage(req,res,db));

app.listen(3001, ()=>{
    console.log('app is running on port 3001');
})