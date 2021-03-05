const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password_hash: { type: String, require: true, unique: true },
    role: { type: String, require: true },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('users', UserSchema);