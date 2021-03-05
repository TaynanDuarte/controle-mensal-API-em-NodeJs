require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const mongoose = require('mongoose');

async function initConnection() {
    if (process.env.NODE_ENV === 'test') {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } else if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'prod') {
        await mongoose.connect(process.env.CONNECTION_STRING);
    }
}

async function closeConnection() {
    await mongoose.disconnect();
}

module.exports = {
    initConnection,
    closeConnection
}