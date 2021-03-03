

function minutsToSeconds(minuts) {
    if (!Number.isInteger(minuts)) throw new Error('minuts parameter should be a integer');
    return minuts * 60;
}

function secondsToMinuts(seconds) {
    if (!Number.isInteger(seconds)) throw new Error('seconds parameter should be a integer');
    return seconds / 60;
}


module.exports = {
    minutsToSeconds,
    secondsToMinuts
}