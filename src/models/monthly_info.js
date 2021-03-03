

class MonthlyInfo {

    #_id;
    #year;
    #month;
    #payments;

    constructor(_id, year, month, payments = []) {
        this.#_id = _id;
        this.#year = year;
        this.#month = month;
        this.#payments = payments;
    }

    get id() {
        return this.#_id;
    }

    get year() {
        return this.#year;
    }

    get month() {
        return this.#month;
    }

    get payments() {
        return this.#payments;
    }

}

module.exports = MonthlyInfo;