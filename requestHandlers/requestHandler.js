'use strict'

const getHandler = require('./get');
const postHandler = require('./post');
const putHandler = require('./put');
const deleteHandler = require('./delete');
const basicAuth = require('./../basicAuth');

module.exports = ( request, response ) => {

  if (basicAuth.isAuthorized(request, response)) {
    // Switch to handle server HTTP requests
    switch ( request.method ) {
      case 'GET' :
        getHandler( request, response );
        break;
      case 'POST' :
        postHandler( request, response );
        break;
      case 'PUT':
        putHandler( request, response );
        break;
      case 'DELETE':
        deleteHandler( request, response );
        break;
      default:
        console.log('Invalid request method');
    }
  }
}