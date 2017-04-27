'use strict'

// Token to extract
const regex = /^user=(.*)/;

/**
 * Process an Array of searching for and user, return the user is founded if isn´t
 * is returned undefined
 * @param {Object} inputArguments
 * @return {String} username
 */
const processCommandLine = ((inputArguments) => {
  let result;
  let username;
  if (typeof inputArguments === 'string') {
    result = regex.test(inputArguments);
    if (result) {
      username = inputArguments.match(regex)[1];
    }
  } else if (typeof inputArguments === 'object') {
    // check if the object is an Array
    if (Object.prototype.toString.call(inputArguments) === '[object Array]') {
      inputArguments.forEach((element) => {  
        result = regex.test(element);
        if (result) {
          username = element.match(regex)[1];
        }
      });
    }
  }  
  return username;
})

module.exports = processCommandLine;