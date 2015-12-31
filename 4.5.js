'use strict';

const _      = require('lodash');
const crypto = require('crypto');

const input = 'iwrupvqb';

// WARNING: RangeError: Maximum call stack size exceeded
// const miner = (secretKey, curTest) => {
//     curTest = _.isUndefined(curTest) ? 0 : curTest;
//     const test = secretKey.toString() + curTest.toString();
//     return _.startsWith(crypto.createHash('md5').update(test).digest('hex'), '000000') ? test : miner(secretKey, curTest+1);
// };

let found       = false;
let currentTest = 0;
while (!found) {
    const test = input.toString() + currentTest.toString();
    found = _.startsWith(crypto.createHash('md5').update(test).digest('hex'), '000000');
    currentTest = found ? currentTest : currentTest + 1;
}

console.log(currentTest);
