let express = require('express')
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let socket = require('socket.io-client')('https://hackathon-valley127.herokuapp.com');
let watson = require('./credentials'),
    conversation = watson.conversation,
    WORKSPACE_ID = watson.WORKSPACE_ID;
    var bodyParser = require('body-parser');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(__dirname + '/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/conversation', (req, res) => {
    let message = req.body.message;
    let context = req.body.context;
    
    conversation.message({
        input: { text: message },
        workspace_id: WORKSPACE_ID,
        context: context
    }, (err, response) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        if (response.intents.length > 0) {
            console.log('Detected intent: #' + response.intents[0].intent);
        }
        // Display the output from dialog, if any.
        if (response.output.text.length != 0) {
            socket.emit('message', {
                message: response.output.text[0],
                timestamp: Date.now(),
                name: 'Chat Bot',
            })
            res.status(200).send(JSON.stringify({
                response: response.output.text[0],
                context: response.context
            }))
        } else {
            res.status(300).send('No response');
        }
    })
})

let messages = {};
let replies = {};
let scores = {};
let messageIds = 0;
let rooms = {};

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
    res.sendFile(__dirname + '/build/index.html');
});

io.on('connection', (socket) => {
    // socket.emit('initial data', { 
    //     messages: messages.slice(messages.length - 3, messages.length),
    //     scores,
    //     replies,
    // })
    console.log('Someone new is here!');

    socket.on('subscribe', (room) => {
        rooms[room] = rooms[room] + 1 || 1;
        if (!messages[room]) messages[room] = [];
        if (!scores[room]) scores[room] = {};
        if (!replies[room]) replies[room] = {};

        socket.join(room);
    })

    socket.on('unsubscribe', (room) => {
        rooms[room] = rooms[room] - 1 || 0;
        socket.leave(room);
    })

    socket.on('disconnect', () => {
        console.log('Aaaaaand they\'re gone :(');
    })

    socket.on('message', (data, room) => {
        let newMessage = Object.assign(data, {
            id: messageIds++,
        });
        messages[room].push(newMessage);
        scores[room][messageIds - 1] = 0;
        replies[room][messageIds - 1] = [];
        console.log('new message in room:', room, newMessage);

        // This sends to everyone in the room, including sender
        io.in(room).emit('new message', newMessage);

        // Whle this sends to everyone in room except sender
        // socket.in(room).emit()
    })

    socket.on('upvote', ({ id }, room) => {
        scores[room][id] = scores[room][id] + 1;
        console.log('score updated', { score: scores[room][id], id });
        io.in(room).emit('score update', { score: scores[room][id], id });
    })

    socket.on('downvote', ({ id }, room) => {
        scores[room][id] = scores[room][id] - 1;
        console.log('score updated', { score: scores[room][id], id });
        io.in(room).emit('score update', { score: scores[room][id], id });
    })
    socket.on('reply', (data, room) => {
        let replyId = data.id;
        let newMessage = Object.assign(data, {
            id: messageIds++,
        });
        if (!replies[room][replyId]) replies[room][replyId] = [];
        replies[room][replyId].push(newMessage);
        scores[room][messageIds - 1] = 0;
        console.log('new reply', data.message);
        io.in(room).emit('new reply', { replyId, reply: newMessage })
    })

    socket.on('canvas', (imageData, room ) => {
        io.in(room).emit('update canvas', imageData );
    })
})

http.listen(process.env.PORT || 5000, () => {
    console.log('Listening on port:', process.env.PORT || 5000);
})