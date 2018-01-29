let app = require('express')();
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
    res.sendFile(__dirname + '/build/index.html');
});

io.on('connection', (socket) => {
    socket.emit('initial data', { 
        messages: messages.slice(messages.length - 3, messages.length),
        scores,
        replies,
    })
    console.log('Someone new is here!');

    socket.on('disconnect', () => {
        console.log('Aaaaaand they\'re gone :(');
    })

    socket.on('message', (data) => {
        let newMessage = Object.assign(data, {
            id: messageIds++,
        });
        messages.push(newMessage);
        scores[messageIds - 1] = 0;
        replies[messageIds - 1] = [];
        console.log('new message', newMessage);
        io.emit('new message', newMessage);
    })

    socket.on('upvote', ({ id }) => {
        scores[id] = scores[id] + 1;
        console.log('score updated', { score: scores[id], id });
        socket.emit('score update', { score: scores[id], id });
    })

    socket.on('downvote', ({ id }) => {
        scores[id] = scores[id] - 1;
        console.log('score updated', { score: scores[id], id });
        socket.emit('score update', { score: scores[id], id });
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
        socket.emit('new reply', { replyId, reply: newMessage })
    })

    socket.on('canvas', ({ imageData, width, height }) => {
        // let str = imageData.binaryData.toString('utf-16le');
        // let json = JSON.parse(str);
        // str = JSON.stringify(json);
        // let buf = new Buffer(str, ENCODING);
        var error;
        let data;
        try {
            data = decodeURIComponent(escape(imageData));
        } catch (_error) {
            error = _error;
            if (error instanceof URIError) {
                data = imageData;
            } else {
                throw error;
            }
        }
        socket.emit('update canvas', { imageData, width, height });
    })
})

http.listen(process.env.PORT || 5000, () => {
    console.log('Listening on port: 8000');
})