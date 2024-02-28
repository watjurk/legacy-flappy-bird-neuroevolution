const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

let OPT = {}

server.listen(2000, () => {
    console.log('listening on ' + server.address().port);
});

app.use('/client', express.static(__dirname + '/client'))
app.use('/analisc', express.static(__dirname + '/analisc'))

app.get('/c', (req, res) => {
    res.sendFile(__dirname + '/client/');
});
app.get('/a', (req, res) => {
    res.sendFile(__dirname + '/analisc/');
});

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('c', () => {
        OPT.c = socket.id
    })
    socket.on('a', () => {
        OPT.a = socket.id
    })

    socket.on('upt', (data) => {
        io.to(OPT.a).emit('opt', data)
    })
})