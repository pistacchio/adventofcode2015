'use strict';

const _  = require('lodash');
const fs = require('fs');

const LINE_BREAK   = 10;
const DOUBLE_QUOTE = 34;

const input         = fs.readFileSync('8.input.txt', 'utf8');

const lines         = _.reject(input.toString().split('\n'), _.isEmpty);

const numChars      = _.sum(_.map(lines, l => l.length));
const escaped = _.sum(_.map(lines, l => {
    console.log('');
    console.log('');
    console.log(l);
    const escaped = l.replace(/\"/g, '\\"').replace(/\\\\"/g, '\\\\\\"').replace(/(\\x[0-9a-f]{2})/g, "\\\$1");
    console.log(escaped);
    return escaped.length + 2;
}));

console.log(escaped - numChars);
