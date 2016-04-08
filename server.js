'use strict'

const http = require('http');

const PORT = 3000;

const requestHandler = require('./requestHandlers/requestHandler')

http.createServer(requestHandler).listen(PORT);