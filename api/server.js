const express = require("express");

const server = express();

server.use(express.json());

server.use('*', (request, response) => {
     response.status(404).json({
          message: 'not found',
     })
})

module.exports = server;
