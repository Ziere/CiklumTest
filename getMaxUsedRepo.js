/**
 * This function return a dictionary with key: value with the most used
 * language/languages and the occurence of that repository
 * 
 * @param {Object} gh, Github object, dependency injected
 * @param {String} username,  String with the username
 * @return {Object} 
 */

const GitHub = require('github-api');

// basic auth
let gh = new GitHub({
  token: process.env.token
});

const getMaxUsedRepo = ((username) => {
  return new Promise((resolve, reject) => {
    let user = gh.getUser(username);
    user.listRepos((err, repos) => {
      let favouriteLanguage = {};
      Object.keys(repos).forEach((element) => {
        let language = repos[element].language;
        if (favouriteLanguage[language] && language!== null) {
          favouriteLanguage[language] = favouriteLanguage[language] + 1;
        } else if (language!== null) {
          favouriteLanguage[language] = 1;
        }
      });
      // console.log(favouriteLanguage);
      let mostUsedLanguage;
      Object.keys(favouriteLanguage).forEach((key) => {
        if (mostUsedLanguage === undefined) {
          mostUsedLanguage = {[key]: favouriteLanguage[key]};
        } else {
          if (mostUsedLanguage[Object.keys(mostUsedLanguage)[0]] < favouriteLanguage[key]) {
            mostUsedLanguage = {[key]: favouriteLanguage[key]};
          } else if (mostUsedLanguage[Object.keys(mostUsedLanguage)[0]] === favouriteLanguage[key]){
            mostUsedLanguage[key] = favouriteLanguage[key];
          }
        }
      });
      if ((mostUsedLanguage) === undefined) {
        reject('The user have repositorie/s but without any language');
      };
      resolve(mostUsedLanguage);
    }).catch((error) => 
    {
      console.log(error)
      reject('The introduced user doesn´t exist in Github or the token is not valid');
    });
  });  
});

module.exports = getMaxUsedRepo;