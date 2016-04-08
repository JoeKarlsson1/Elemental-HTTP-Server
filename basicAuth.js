 'use strict'

module.exports.isAuthorized = ( request, response ) => {

  // If they pass in a basic auth credential it'll be in a header called "Authorization" (note NodeJS lowercases the names of headers in its request object)

  // auth is in base64(username:password)  so we need to decode the base64
  var auth = request.headers['authorization'];

  // No Authorization header was passed in so it's the first time the browser hit us
  if (!auth) {

    // Sending a 401 will require authentication, we need to send the 'WWW-Authenticate' to tell them the sort of authentication to use
    // Basic auth is quite literally the easiest and least secure, it simply gives back  base64( username + ":" + password ) from the browser
    response.statusCode = 401;
    response.setHeader( 'WWW-Authenticate', 'Basic realm="Secure Area"' );
    response.end( '<html><body>Need some creds son</body></html>' );
    return false;

  // The Authorization was passed in so now we validate it
  } else if (auth) {

    // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
    var tmp = auth.split(' ');

    // create a buffer and tell it the data coming in is base64
    var buf = new Buffer(tmp[1], 'base64');
    var plain_auth = buf.toString();        // read it back out as a string

    // At this point plain_auth = "username:password"
    var creds = plain_auth.split(':');      // split on a ':'
    var username = creds[0];
    var password = creds[1];

    // Is the username/password correct?
    if ( ( username == 'joe' ) && ( password == 'password' ) ) {

      return true;

    } else {
      // Force them to retry authentication
      response.statusCode = 401;
      response.setHeader( 'WWW-Authenticate', 'Basic realm="Secure Area"' );

      // response.statusCode = 403;   // or alternatively just reject them altogether with a 403 Forbidden

      response.end( '<html><body>You shall not pass</body></html>' );
      return false;
    }
  }
}