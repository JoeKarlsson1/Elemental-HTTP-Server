'use strict'

const fs = require( 'fs' );
const path = require( 'path' );
const templateHelper = require( '../templates/templateHelper' );

/*
  *  ## GET ##
  *  routing and default 404
*/
var getModule = module.exports = ( request, response ) => {
  let numOfElements = 0;
  let elements = [];

  // Get and format the extname - this is used for writing the header requests
  let extName = path.extname(request.url);
  if ( extName.charAt( 0 ) === '.' ) {
    extName = extName.slice( 1 );
  }
  if (extName === '') {
    extName = 'html'
  }

  // default route setup to read index file

  if ( request.url === '/' || request.url === '/index.html' ) {
    //get an array of all the elements
    fs.readdir( 'public/', ( err, files ) => {
      if ( err) console.log( err );

      // filter out files in public that are not elemental files
      let elementsArr = files.filter( (curr, index, array ) => {
        return (
          curr !== '.keep' &&
          curr !== '404.html' &&
          curr !== 'css' &&
          curr !== 'index.html'
        )
      })

      fs.readFile( 'templates/indexTemplate.html', ( err, template) => {
        if (err) console.log( err );
        var renderedIndex = templateHelper.index( template, elementsArr );

        fs.writeFile('public/index.html', renderedIndex, (err) => {
          if(err) console.log(err);
          //resonse head OK
          response.writeHead(200, {
            'Content-Type' : 'text/' + extName
          });
          response.end(renderedIndex);

        });
      } )


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
          response.writeHead(200, {
            'Content-Type' : 'text/' + extName
          });
          response.end(data);
        });

        // if it does not, read the 404 file and write a 404 response in the header
      } else {
        fs.readFile( 'public/404.html', ( err, data ) => {
          if ( err ) console.log( err );

          // response head not found
          response.writeHead( 404, {
            'Content-Type' : 'text/' + extName
          });
          response.end( data );
        });
      }
    });
  }
}