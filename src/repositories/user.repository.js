const UserSchema = require('../database/schemas/user.schema');
const hash = require('../utils/hashTools');

class UserRepository {

    async getUser(email, password) {
        const user = await UserSchema.findOne({ email: email });

        if (!user) return null;

        const matchPassword = await hash.verifyPassword(user.password_hash, password);
        return matchPassword ? user : null;
    }

    async updateUser(user) {
        return await UserSchema.updateOne(
            { _id: user._id },
            { name: user.name, email: user.email, password_hash: user.password, role: user.role });
    }

    async createUser(user) {
        const newUser = await UserSchema.create(user);
        return newUser.save();
    }

}

module.exports = UserRepository;
