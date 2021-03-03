

function minutsToSeconds(minuts) {

    if (!Number.isInteger(minuts)) throw new Error('minuts parameter should be a integer');

    return minuts * 60;
}


module.exports = {
    minutsToSeconds
}