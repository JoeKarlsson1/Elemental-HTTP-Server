var http = require('http');

var PORT = 3000;

var requestHandler = require('./requestHandlers/requestHandler');

http.createServer(requestHandler).listen(PORT);