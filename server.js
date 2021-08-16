

var express = require('express'),
  app = express(),
  port = process.env.PORT || 4000;

const cors = require('cors');
var server = app.listen(port, () => {
  console.log('Server started on: ' + port);
});

// attach socket to the node server
var io = require('socket.io')(server);
io.on('connection', client => {
    console.log('New Connection');

    // socket event for client subscription
    client.on('subscribeToDateEvent', interval => {
      console.log('Client is subscribing with interval: ', interval);

      // emit message to the client side
      setInterval(() => {
        client.emit('getDate', new Date().toUTCString());
      }, interval);
    });
  });

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000' // URL of the react (Frontend) app
}));

app.get('/', (req, res) => {
  res.send('Welcome to Socket.IO with React js App!');
});



