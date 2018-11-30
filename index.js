const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/javascript', (req, res) => {
    res.sendFile(__dirname + '/public/javascript.html');
});

app.get('/swift', (req, res) => {
    res.sendFile(__dirname + '/public/swift.html');
});

app.get('/css', (req, res) => {
    res.sendFile(__dirname + '/public/css.html');
});
// namespace
const chat = io.of('/chat');

chat.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        chat.in(data.room).emit('message', `New user joined ${data.room} room!`);
    });

    socket.on('message', (data) => {
        console.log(`message: ${data.msg}`);
        chat.in(data.room).emit('message', data.msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        chat.emit('message', 'user disconnect');
    })
}); 