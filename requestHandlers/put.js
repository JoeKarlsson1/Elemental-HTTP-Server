var qs = require( 'querystring' );
var fs = require( 'fs' );
var templateHelper = require( '../templates/templateHelper' );

/*
  *  ## PUT ##
  *  Parses in data with some validation checks
*/
var putModule = module.exports = ( request, response ) => {

  // clear dataBuffer variable
  var dataBuffer = '';

  // on data entry, store it in the dataBuffer var
  request.on('data', (data) => {
    dataBuffer += data;
  });

  // on request end
  request.on('end', () => {

    // parse our object and store into variable
    var data = qs.parse( dataBuffer.toString() );

    // check if the url exists in our file system
    fs.exists('public' + request.url, (exists) => {

      // if it exists, read the file
      if (exists) {

        // read our template file
        fs.readFile('templates/elementTemplate.html', (err, template) => {

          // use helper function to fill out data in template file
          renderedElement = templateHelper.element(template, data.elementName, data.elementSymbol, data.elementAtomicNumber, data.elementDescription);

          // write our template file over the old file
          fs.writeFile('./public' + request.url, renderedElement, (err) => {
            if ( err ) console.log( err );

            // write to head successful
            response.writeHead( 200, {
                'Content-Type' : 'application/json'
              });
            response.end(JSON.stringify({ 'success' : true }) );
          });
        });

        // if it does not write a 500 header response
      } else {

        // server error response if url does not exist in file system
        response.writeHead(500, {
                'Content-Type' : 'application/json'
              });
        response.end(JSON.stringify({ 'error' : 'resource ' + request.url + ' does not exist' }));
      }
    });
  });

  // end ## PUT ##

}