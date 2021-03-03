const UserSchema = require('../database/schemas/user.schema');

class UserFactory {

    async getUser(email, password) {
        return await UserSchema.findOne({ email: email, password_hash: password });
    }

    async updateUser(user) {
        return await UserSchema.updateOne(
            { _id: user._id },
            { name: user.name, email: user.email, password_hash: user.password, role: user.role });
    }

}

module.exports = UserFactory;


// name: { type: String, require: true },
//     email: { type: String, require: true, unique: true },
//     password_hash: { type: String, require: true, unique: true },
//     role: { type: String, require: true }