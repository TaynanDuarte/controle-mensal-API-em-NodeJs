require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const express = require('express');
const bodyparser = require('body-parser');
const corsConfig = require('./cors.config');

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(corsConfig);

app.disable('x-powered-by');

const dataBaseConnection = require('./database/connection');
const userController = require('./controller/user.controller')();



app.get('/', (req, res) => {
    return res.send('*')
});

app.post('/login', (req, res) => {

    return res.send('aaaa');
});

app.post('/register', async (req, res) => {

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password_hash: req.body.password,
        role: 'common_user'
    };

    try {

        dataBaseConnection.initConnection();
        const userCreated = await userController.createUser(newUser);
        dataBaseConnection.closeConnection();

        return res.status(201).send('user registered');
    } catch (error) {
        console.log('api error: ', error);
        dataBaseConnection.closeConnection();
        return res.status(400).send('user not registered');
    }
});


app.listen(3001);

console.log('>>>>>>>>>> ', process.env.NODE_ENV);
console.log('Server running on port 3001');