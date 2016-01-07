var fs = require( 'fs' );
var path = require( 'path' );
var templateHelper = require( '../templates/templateHelper' )


/*
  *  ## GET ##
  *  routing and default 404
*/
var getModule = module.exports = ( request, response ) => {
  var numOfElements;
  var elements;
  var extName = path.extname(request.url);
  console.log(extName)

  // default route setup to read index file
  if ( request.url === '/' || request.url === '/index.html' ) {
    var extName = '.html';

    // Get a list of all the files in the public directory
    fs.readdir('public', ( err, files ) => {
      if ( err ) console.log( err );

      // Filter out all of the non-elemental html files
      elements = files.filter( ( e, i, a ) => {
        return (
          e !== '.keep' &&
          e !== '404.html' &&
          e !== 'index.html' &&
          e !== 'css'
          )
      })

      numOfElements = elements.length;
      console.log(numOfElements)
    });

    // read template to construct new index file
    fs.readFile('templates/indexTemplate.html', ( err, template ) => {
      if ( err ) console.log( err );

      //call template helper function and create new index.html
      var renderedIndex = templateHelper.index( template, numOfElements, elements );

      // write the newly created index.html template
      fs.writeFile( './public/index.html', renderedIndex, ( err ) => {
        if ( err ) console.log( err );

        // end response with newly rendered function

        response.writeHead( 200, {
          'Content-Type' : 'text/html'
        } );
        response.end( renderedIndex );

      });
    })

  // if its not the default route
  } else {

    // check if the file exists within our public folder
    fs.exists( 'public' + request.url, ( exists ) => {

      // if it exists, read the file
      if ( exists ) {
        fs.readFile( 'public' + request.url, ( err, data ) => {
          if ( err ) console.log( err );

          //resonse head OK
          response.writeHead(200);
          response.end(data);
        });

        // if it does not, read the 404 file and write a 404 response in the header
      } else {
        fs.readFile('public/404.html', (err, data) => {
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