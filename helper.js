function updateScore(data, change) {
    data.score += change;
    return data;
}

function incrementScore(data) {
    return updateScore(data, 1);
}
function decrementScore(data) {
    return updateScore(data, 1);
}

function updateObject(object, newData) {
    return Object.assign({}, object, )
}

module.exports = {
    updateScore,
    incrementScore,
    decrementScore
}
