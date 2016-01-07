var qs = require( 'querystring' );
var fs = require( 'fs' );

/*
  *  ## POST ##
  *   parses in data with some
  *   validation checks. Then,
  *   checks if the files exists, and
  *   writes it, if it does not.
  *
*/
module.exports = function( request, response ) {
  var elements;
  var dataBuffer = '';

  console.log(request.url)
  // If the client is in on the correct uri
  if (request.url === '/elements') {

    //on data, store the data in our variable
    request.on('data', function(data) {
      dataBuffer += data;
      console.log(dataBuffer.toString())
    })
  }

}