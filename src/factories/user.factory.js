const UserSchema = require('../database/schemas/user.schema');

class UserFactory {

    async getUser(email, password) {
        return await UserSchema.findOne({ email: email, password_hash: password });
    }

}

module.exports = UserFactory;