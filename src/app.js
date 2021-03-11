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

const registerController = require('./controller/register.controller');
const loginController = require('./controller/login.controller');


app.get('/', (req, res) => {
    return res.send('*')
});


app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send('invalid request');

    try {
        const authResponse = await loginController.getUser(email, password);
        if (Object.keys(authResponse).length === 0) return res.status(401).send('authentication failed');
        else return res.status(201).send(authResponse);

    } catch (error) {
        res.status(401).send('authentication failed');
    }
});


app.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    try {
        const createdUser = await registerController.createUser(name, email, password);
        if (Object.keys(createdUser).length === 0) return res.status(400).send('register failed');
        else return res.status(201).send('user created');
    } catch (error) {
        res.status(400).send('register failed');
    }

});

module.exports = app;
