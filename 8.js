'use strict';

const _  = require('lodash');
const fs = require('fs');

const LINE_BREAK   = 10;
const DOUBLE_QUOTE = 34;

const input         = fs.readFileSync('8.input.txt', 'utf8');

const lines         = _.reject(input.toString().split('\n'), _.isEmpty);

const numChars      = _.sum(_.map(lines, l => l.length));
const numInnerChars = _.sum(_.map(lines, l => eval(l).length));

console.log(numChars);
console.log(numInnerChars);
console.log(numChars - numInnerChars);
