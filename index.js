'use strict'

const GitHub = require('github-api');
const readline = require('readline');
const getMaxUsedRepo = require('./getMaxUsedRepo');
const Regex = require("regex");
let regex = new Regex(/user=*/);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// basic auth
let gh = new GitHub({
  token: process.env.token
});

// console.log(process.argv);

rl.question('Insert an user to know the most used language: ', (answer) => {
  getMaxUsedRepo(gh,answer).then((data) => {
    console.log(data);
  }).catch((error) => { console.log(error) });
  rl.close();
});