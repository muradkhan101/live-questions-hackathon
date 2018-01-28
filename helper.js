function updateScore(messageList, id, change) {
    return messageList.map( message => {
        if (message.id === id) return (message.score += change, message)
        if (message.children)
            message.children = message.children.map(childMessage => 
                childMessage.id === id ? (childMessage.score += change, childMessage) : childMessage )
        return message;
    })
}

function incrementScore(messageList, id) {
    return updateScore(messageList, id, 1);
}
function decrementScore(messageList, id) {
    return updateScore(messageList, id, -1);
}

function updateObject(object, newData) {
    return Object.assign({}, object, )
}

module.exports = {
    updateScore,
    incrementScore,
    decrementScore
}
