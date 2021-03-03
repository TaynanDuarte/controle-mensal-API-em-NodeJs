const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    _id: { type: Number, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password_hash: { type: String, require: true },
    role: { type: String, require: true }
});

module.exports = mongoose.model('users', UserSchema);