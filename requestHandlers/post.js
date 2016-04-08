'use strict'

const qs = require('querystring');
const fs = require('fs');
const templateHelper = require('../templates/templateHelper.js');

/**
 * POST creates a new file if one does not already exist
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
module.exports = ( request, response ) => {
  let dataBuffer = '';

  //
  request.on( 'data', ( data ) => {
    dataBuffer += data;
  });

  // Wait for the end of the request then ...
  request.on('end', () => {

    //parse through the databuffer and save to data
    let data = qs.parse( dataBuffer.toString());

    //read in elemental template/chipotle file
    fs.readFile('templates/elementTemplate.html', ( err, template) => {
      if (err) console.log(err);

      //invoke template to render elemental with correct data
      let renderedElement = templateHelper.element(
        template,
        data.elementName,
        data.elementSymbol,
        data.elementAtomicNumber,
        data.elementDescription)

      fs.writeFile( './public/' + data.elementName.toLowerCase() + '.html', renderedElement, ( err ) => {
        if (err) console.log(err);

        //write a response back to client if successful
        response.writeHead( 200, {
          'Content-type' : 'application/json'
        })
        response.end(JSON.stringify({ 'success' : true }))
      } );

    })

  })
}