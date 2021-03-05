

class User {

    #_id;
    #name;
    #email;
    #password;
    #role;

    constructor(_id, name, email, password, role) {
        this.#_id = _id;
        this.#name = name;
        this.#email = email;
        this.#password = password;
        this.#role = role;
    }

    get id() {
        return this.#_id;
    }

    get name() {
        return this.#name;
    }

    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    get role() {
        return this.#role;
    }

    getJsonFormat() {

        const name = this.#name;
        const email = this.#email;
        const password = this.#password;
        const role = this.#role;

        return {
            name,
            email,
            password,
            role
        }
    }


    static isAValidObject(user) {
        return user.name && user.email && user.role;
    }

}

module.exports = User;