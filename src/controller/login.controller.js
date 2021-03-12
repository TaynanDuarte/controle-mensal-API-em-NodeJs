const authTools = require('../auth/auth.tools');
const userFactory = require('../factories/user.factory');
const hash = require('../utils/hashTools');


async function getUser(email, password) {

    // const passwordHash = await hash.getArgonHash(password);

    const userService = userFactory().userServiceFactory();
    const user = await userService.getUser(email, password);

    if (!user) return;

    const token = authTools.generateTokenWithEmail(user.email);

    return {
        token: token,
        data: {
            email: user.email
        }
    }

}

module.exports = {
    getUser
}