const express = require('express');
const bodyparser = require('body-parser');

require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:false }));

app.disable('x-powered-by');


const userController = require('./controller/user.controller')();

app.get('/', (req, res) => {
    return res.send('*')
});

app.post('/login', (req, res) => {

    return res.send('aaaa');
});

app.post('/register', (req, res) => {

});


app.listen(3000);

console.log('>>>>>>>>>> ', process.env.NODE_ENV);
console.log('Server running on port 3000');