const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password_hash: { type: String, require: true, unique: true },
    role: { type: String, require: true },
    timestamps: {
        updatedAt: { type: String, default: new Date().toLocaleDateString() }
    }
});

module.exports = mongoose.model('users', UserSchema);