
class Payment {

    #name;
    #amount;
    #waitingForApproval;
    #paymentApproved;

    constructor(name, amount, waitingForApproval, paymentApproved) {
        this.#name = name;
        this.#amount = amount;
        this.#waitingForApproval = waitingForApproval;
        this.#paymentApproved = paymentApproved;
    }

    get name() {
        return this.#name;
    }
    get amount() {
        return this.#amount;
    }
    get waitingForApproval() {
        return this.#waitingForApproval;
    }
    get paymentApproved() {
        return this.#paymentApproved;
    }
}

module.exports = Payment;