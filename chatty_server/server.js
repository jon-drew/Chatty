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

  ws.on('message', function incoming(message){
    message = JSON.parse(message);
    message.id = uuid();

    if (message.username === undefined) {
      message.username = username;
    }

    if (message.content === undefined) {
      if (username === message.username){
        return;
      };

      message.content = `${username} changed their name to ${message.username}.`
      username = message.username;
      message.username = "";
    }
    wss.broadcast(JSON.stringify(message));
  })

  ws.on('close', () => {
    console.log('Client disconnected.');
    wss.broadcast(wss.clients.size);
  });
});