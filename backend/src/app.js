const express = require('express');
const router = require('./routes/routes');

const server = express();
server.use(express.json());
server.use(router);

server.listen(3333);
