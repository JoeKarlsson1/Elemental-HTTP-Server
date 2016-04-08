'use strict'

/*
  * ## POST HELPERS ##
  * function to write dynamic HTML based on data.
  *
*/

module.exports.element = ( template, name, symbol, number, description ) => {

  return template.toString()
      .replace(/{{ elementName }}/gi, name)
      .replace(/{{ elementSymbol }}/gi, symbol)
      .replace(/{{ elementAtomicNumber }}/gi, number)
      .replace(/{{ elementDescription }}/gi, desc);
}

module.exports.index = ( template, numOfElements, elements ) => {

  return template.toString()
        .replace( '{{ numberOfElements }}', numOfElements )
        .replace( '{{ elementLinks }}', this.elementListBuilder(elements) )
}

module.exports.elementListBuilder = ( elements ) => {
  let linkBuilder = '';

  for ( let i = elements.length - 1; i >= 0; i-- ) {
    linkBuilder += '<li><a href="/{{ link }}">{{ elementName }}</a></li>'
    .replace( '{{ link }}', elements[i] )
    .replace( '{{ elementName }}', elements[i].replace('.html', '') );
  };
  return linkBuilder;
}