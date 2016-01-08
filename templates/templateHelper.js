'use strict'

const templateHelper = {
  /*
    * ## POST HELPERS ##
    * function to write dynamic HTML based on data.
    *
  */

  element : ( template, name, symbol, number, description ) => {

    return template.toString()
          .replace( '{{ elementName }}', name )
          .replace( '{{ elementName }}', name )
          .replace( '{{ elementSymbol }}', symbol )
          .replace( '{{ elementAtomicNumber }}', number )
          .replace( '{{ elementDescription }}', description );
  },

  index : ( template, numOfElements, elements ) => {

    return template.toString()
          .replace( '{{ numberOfElements }}', numOfElements )
          .replace( '{{ elementLinks }}', this.elementListBuilder(elements) )
  },

  elementListBuilder : ( elements ) => {
    let linkBuilder = '';

    for ( let i = elements.length - 1; i >= 0; i-- ) {
      linkBuilder += '<li><a href="/{{ link }}">{{ elementName }}</a></li>'
      .replace( '{{ link }}', elements[i] )
      .replace( '{{ elementName }}', elements[i].replace('.html', '') );
    };
    return linkBuilder;
  }

};

module.exports = templateHelper;