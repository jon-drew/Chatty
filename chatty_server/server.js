// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function(client) {
      client.send(data);
    });
  };

wss.on('connection', (ws) => {
  console.log('Client connected.');
  wss.broadcast(JSON.stringify({counter: wss.clients.size}));

  let username = "Anonymous";

  ws.on('message', function incoming(message) {
    let parsedMessage = JSON.parse(message);
    parsedMessage.id = uuid();

    if (parsedMessage.username === undefined) {
      parsedMessage.username = username;
    }

    if (parsedMessage.content === undefined) {
      if (parsedMessage.username === username) {
        return
      }
      parsedMessage.content = `${username} changed their name to ${parsedMessage.username}.`
      username = parsedMessage.username;
      parsedMessage.username = "";
    }

    wss.broadcast(JSON.stringify(parsedMessage));
  })

  ws.on('close', () => {
    console.log('Client disconnected.');
    wss.broadcast(JSON.stringify({wss.clients.size}));
  });
});