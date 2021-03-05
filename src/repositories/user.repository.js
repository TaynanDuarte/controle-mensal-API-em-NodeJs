const UserSchema = require('../database/schemas/user.schema');

class UserRepository {

    async getUser(email, password) {
        return await UserSchema.findOne({ email: email, password_hash: password });
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
