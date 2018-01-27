let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let helper = require('./helper');

let messages = [];
let messageIds = 0;

/*  Message structure
    {
        id
        author
        text
        timestamp
        score
    }

*/

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {

    console.log('Someone new is here!');

    socket.on('disconnect', () => {
        console.log('Aaaaaand they\'re gone :(');
    })

    socket.on('message', (data) => {
        let newMessage = Object.assign(data, {
            id: messageIds++,
            score: 0,
            children: []
        });
        messages[messageIds - 1] = newMessage;
        io.emit('message', data);
    })

    socket.on('upvote', ({id}) => {
        let updated = helper.incrementScore(Object.assign({}, messages[id]));
        messages[id] = updated;
        socket.emit('score update', updated);
    })

    socket.on('downvote', ({id}) => {
        let updated = helper.decrementScore(Object.assign({}, messages[id]));
        messages[id] = updated;
        socket.emit('score update', updated);
    })
    socket.on('reply', (id, data) => {
        let newMessage = Object.assign(data, {
            id: messageIds++,
            score: 0
        });
        messages[id].children.push(newMessage);
        socket.emit('new reply', {id, reply: newMessage})
    })
})

http.listen(8000, () => {
    console.log('Listening on port: 8000');
})