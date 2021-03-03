

class User{

    #_id;
    #name;
    #email;
    #role;

    constructor(_id, name, email, role){
        this.#_id = _id;
        this.#name = name;
        this.#email = email;
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

    get role() {
        return this.#role;
    }

}

module.exports = User;