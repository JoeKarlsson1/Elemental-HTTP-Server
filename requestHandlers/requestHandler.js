var qs = require( 'querystring' );
var fs = require( 'fs' );
var getRequest = require('./get');
var postRequest = require('./post');
var putRequest = require('./put');
var deleteRequest = require('./delete');

module.exports = function( request, response ) {

  /*
    *  ## REQUEST ##
    *  switch statement for different request methods
  */
  switch (request.method) {

    case 'GET':
      getRequest(request, response);
      break;
    case 'POST':
      postRequest(request, response);
      break;
    case 'PUT':
      putRequest(request, response);
      break;
    case 'DELETE':
      deleteRequest(request, response);
      break;
    default:
      console.log('Invalid request method')
  }
};