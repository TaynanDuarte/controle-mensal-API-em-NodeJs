const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:false }));


const userController = require('./controller/user.controller')();

app.get('/', (req, res) => {
    return res.send('*')
})

app.post('/login', (req, res) => {

    return res.send('aaaa');
})


app.listen(3000);

console.log('Server running on port 3000');