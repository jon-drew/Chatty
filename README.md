Chatty Project

Chatty is a single-page, real-time messaging app.

It uses Node, Express, Websockets, and React with an in-memory database to store messages and users. Each message has an associated username and content that can be seen by all users, as well as a hidden UUID. Users can see the number of people connected and are notified when a user changes their username.

Dependencies:
"express": "4.16.2",
"ws": "3.3.2"
"uuid": "^3.1.0",