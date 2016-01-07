var qs = require( 'querystring' );
var fs = require( 'fs' );

/*
  *  ## GET ##
  *  routing and default 404
*/
module.exports = function( request, response ) {
  // default route setup to read index file
  if ( request.url === '/' || request.url === '/index.html' ) {

    // read template to construct new index file
    fs.readFile('public/index.html', function (err, data) {
      if (err) console.log( err );

      // end response with newly rendered function
      response.writeHead(200, {
                    'Content-Type' : 'text/html'
                  });
      response.end(data);

    });

// if its not the default route
  } else {

    // check if the file exists within our public folder
    fs.exists('public' + request.url, function (exists) {

      // if it exists, read the file
      if (exists) {
        fs.readFile('public' + request.url, function(err, data) {
          if (err) console.log( err );

          //resonse head OK
          response.writeHead(200);
          response.end(data);
        });

        // if it does not, read the 404 file and write a 404 response in the header
      } else {
        fs.readFile('public/404.html', function(err, data) {
          if (err) console.log( err );

          // response head not found
          response.writeHead(404, {
                      'Content-Type' : 'text/html'
                    });
          response.end(data);
        });
      }
    });
  }
}