

class User {

    #_id;
    #name;
    #email;
    #password_hash;
    #role;

    constructor(_id, name, email, password_hash, role) {
        this.#_id = _id;
        this.#name = name;
        this.#email = email;
        this.#password_hash = password_hash;
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

    get password_hash() {
        return this.#password_hash;
    }

    get role() {
        return this.#role;
    }

    getJsonFormat() {

        const name = this.#name;
        const email = this.#email;
        const password_hash = this.#password_hash;
        const role = this.#role;

        return {
            name,
            email,
            password_hash,
            role
        }
    }


    static isAValidObject(user) {
        return user.name && user.email && user.role;
    }

}

module.exports = User;