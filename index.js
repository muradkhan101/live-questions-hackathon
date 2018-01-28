let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let helper = require('./helper');

let messages = [];
let replies = {};
let scores = {};
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
    socket.emit('initial data', {messages: messages.slice(messages.length - 3, messages.length)})
    console.log('Someone new is here!');

    socket.on('disconnect', () => {
        console.log('Aaaaaand they\'re gone :(');
    })

    socket.on('message', (data) => {
        let newMessage = Object.assign(data, {
            id: messageIds++,
        });
        messages.push(newMessage);
        scores[messageIds - 1 ] = 0;
        replies[messageIds - 1] = [];
        console.log('new message', newMessage);
        io.emit('new message', newMessage);
    })

    socket.on('upvote', ({id}) => {
        scores[id] = scores[id] + 1;
        console.log('score updated', { score: scores[id], id });
        socket.emit('score update', {score: scores[id], id});
    })

    socket.on('downvote', ({id}) => {
        scores[id] = scores[id] - 1;
        console.log('score updated', { score: scores[id], id });
        socket.emit('score update', {score: scores[id], id});
    })
    socket.on('reply', (data) => {
        let replyId = data.id;
        let newMessage = Object.assign(data, {
            id: messageIds++,
        });
        if (!replies[replyId]) replies[replyId] = [];
        replies[replyId].push(newMessage);
        scores[messageIds - 1] = 0;
        console.log('new reply', data.message);
        socket.emit('new reply', { replyId, reply: newMessage})
    })

    socket.on('canvas', ({imageData, width, height}) => {
        // let str = imageData.binaryData.toString('utf-16le');
        // let json = JSON.parse(str);
        // str = JSON.stringify(json);
        // let buf = new Buffer(str, ENCODING);
        var error;
        let data;
        try {
            data =  decodeURIComponent(escape(imageData));
        } catch (_error) {
            error = _error;
            if (error instanceof URIError) {
                data = imageData;
            } else {
                throw error;
            }
        }
        socket.emit('update canvas', {imageData, width, height});
    })
})

http.listen(8001, () => {
    console.log('Listening on port: 8000');
})