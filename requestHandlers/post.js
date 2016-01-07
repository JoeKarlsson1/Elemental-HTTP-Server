var qs = require( 'querystring' );
var fs = require( 'fs' );
var templateHelper = require( '../templates/templateHelper' )

/*
  *  ## POST ##
  *   parses in data with some
  *   validation checks. Then,
  *   checks if the files exists, and
  *   writes it, if it does not.
  *
*/
var postModule = module.exports = ( request, response ) => {
  var elements;
  var dataBuffer = '';

  // if the client is on the correct uri
  if ( request.url === '/elements' ) {

    // on data, store the data in our variable
    request.on( 'data', ( data ) => {
      dataBuffer += data;
    } );

    // on end of request then
    request.on( 'end', () => {

      // take our client data and parse it from the buffer
      var data = qs.parse( dataBuffer.toString() );

      // validation for correct data
      if (typeof data === 'object' && data.elementName !== undefined) {

        // check if the file has already been created
        fs.exists('public/' + data.elementName + '.html', ( exists ) => {

          // if it doesnt, write the file
          if (!exists) {

            // read template file
            fs.readFile('templates/elementTemplate.html', ( err, template ) => {

              //call template helper function and create new element page
              var renderedElement = templateHelper.element( template, data.elementName, data.elementSymbol, data.elementAtomicNumber, data.elementDescription );

              // write the newly created template
              fs.writeFile( './public/' + data.elementName + '.html', renderedElement, (err ) => {
                if ( err ) console.log( err );

                // write to head successful
                response.writeHead(200, {
                      'Content-Type' : 'application/json'
                    });
                response.end( JSON.stringify( { 'success' : true } ) );
              });

            });

          } else {

            // error handling if file exists already
            response.writeHead(303, {
                  'Content-Type' : 'application/json'
                });
            response.end(JSON.stringify({ 'found' : 'resource /' + data.elementName + '.html already exists.' } ));
          }
        });
      } else {

        // error handling if no, or bad data entered on POST
        response.writeHead(406, {
              'Content-Type' : 'application/json'
            });
        response.end(JSON.stringify({ 'error' : 'invalid input type on POST' }));
      }
    });
  } else {

    // error handling if on the wrong uri for POST
    response.writeHead(403, {
          'Content-Type' : 'application/json'
        });
    response.end(JSON.stringify({ 'error' : 'POST requests should be made on the /elements uri' }));
  }

  // end ## POST ##

}