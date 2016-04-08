'use strict'

const qs = require( 'querystring' );
const fs = require( 'fs' );
const templateHelper = require( '../templates/templateHelper' );

/*
  *  ## DELETE ##
  *   utilizes fs.unlink to remove a file on a DELETE request
*/
const deleteModule = module.exports = ( request, response ) => {
  // check if the file exists in the system
  fs.exists( './public' + request.url, ( exists ) => {

    if ( exists ) {

      // prevent client from deleting these base files on POST
      if (
        request.url !== '/' &&
        request.url !== '/404.html' &&
        request.url !== '/index.html') {

        // remove file from our system
        fs.unlink('./public' + request.url, (err) => {
          if ( err ) console.log( err );

          // then write a success header
          response.writeHead(200, {
              'Content-Type' : 'application/json'
            });
          response.end(JSON.stringify({ 'success' : true }));
        });
      } else {

        // response if attemping to delete wrong files
        response.writeHead(403, {
          'Content-Type' : 'application/json'
        });
        response.end(JSON.stringify({ 'forbidden' : 'attempting to delete a core file' }));
      }
    } else {

      // if it doesnt exist throw a 500 error
      response.writeHead(500, {
        'Content-Type' : 'application/json'
      });
      response.end(JSON.stringify({ 'error' :  'resource ' + request.url + ' does not exist' }));
    }
  });

  // end ## DELETE ##

}
