'use strict'

const GitHub = require('github-api');
const readline = require('readline');
const getMaxUsedRepo = require('./getMaxUsedRepo');
const regex = /^user=(.*)/;

if (!process.env.token) {
  console.log('Please setup your own token to use Github in $token env var');
  return;
}

// basic auth
let gh = new GitHub({
  token: process.env.token
});

// allowing username via command line
let username;

process.argv.forEach(function(element) {  
  let result = regex.test(element);
  if (result) {
    username = element.match(regex)[1];
  }
});

// is username exist means the username was introduced via command line
if (username) {
  console.log(`User ${username} provided via command line`);
  getMaxUsedRepo(gh,username).then((data) => {
    console.log(data);
  }).catch((error) => { console.log(error) });
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Insert an user to know the most used language: ', (answer) => {
    getMaxUsedRepo(gh,answer).then((data) => {
      console.log(data);
    }).catch((error) => { console.log(error) });
    rl.close();
  });
};
