const express = require('express');
const cors = require('cors');
const router = require('./routes/routes');

const server = express();
server.use(cors());
server.use(express.json());
server.use(router);

server.listen(3333);
