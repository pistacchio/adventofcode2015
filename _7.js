'use strict';
// -harmony-destructuring

const _ = require('lodash');

const input = `
123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i
`;


const circuit = _(input.split('\n'))
                .map(_.trim)
                .reject(_.isEmpty)
                .reduce((acc, i) => {
                    const match = i.match(/^(NOT)?((.*?)\s(AND|OR|LSHIFT|RSHIFT)\s(.*?)|.*?)\s->(.*)$/);
                    let  [__, not, var1, var1_2, op, var2, out] = match;
                    op   = op || not || '->';
                    var1 = _.contains(var1, op) ? var1_2 : var1;

                    acc[out] = {
                        active: op === '->',
                        op:     op,
                        wires:  _.isNumber(var1) ? parseInt(var1) : [var1, var2]
                    };

                    // if (m = i.match(/^(\d+)\s->\s(\w+)$/)) {
                    //     acc[m[2]] = {
                    //         active: true,
                    //         value:  parseInt(m[1])
                    //     };
                    // } else if (m = i.match(/^(\w+)\s->\s(\w+)$/)) {
                    //     acc[m[2]] = {
                    //         active: false,
                    //         value:  ['->', m[1]]
                    //     };
                    // } else if (m = i.match(/^(\w+)\sAND\s(\w+)\s->\s(\w+)$/)) {
                    //     acc[m[3]] = {
                    //         active: false,
                    //         value:  ['&', m[1], m[2]]
                    //     };
                    // } else if (m = i.match(/^(\w+)\sOR\s(\w+)\s->\s(\w+)$/)) {
                    //     acc[m[3]] = {
                    //         active: false,
                    //         value:  ['|', m[1], m[2]]
                    //     };
                    // } else if (m = i.match(/^(\w+)\sLSHIFT\s(\d+)\s->\s(\w+)$/)) {
                    //     acc[m[3]] = {
                    //         active: false,
                    //         value:  ['<<', m[1], parseInt(m[2])]
                    //     };
                    // } else if (m = i.match(/^(\w+)\sRSHIFT\s(\d+)\s->\s(\w+)$/)) {
                    //     acc[m[3]] = {
                    //         active: false,
                    //         value:  ['>>', m[1], parseInt(m[2])]
                    //     };
                    // } else if (m = i.match(/^NOT\s(\w+)\s->\s(\w+)$/)) {
                    //     acc[m[2]] = {
                    //         active: false,
                    //         value:  ['^', m[1]]
                    //     };
                    // } else {
                    //     console.log('NOT MATCHED');
                    //     console.log(i);
                    //     console.log('/NOT MATCHED');
                    // }

                   //
                //     if (m = i.match(/^(\d+)\s->\s(\w+)$/)) {
                //         acc[m[2]] = parseInt(m[1]);
                //     } else if (m = i.match(/^(\w+)\sAND\s(\w+)\s->\s(\w+)$/)) {
                //         acc[m[3]] = acc[m[1]] & acc[m[2]];
                //     } else if (m = i.match(/^(\w+)\sOR\s(\w+)\s->\s(\w+)$/)) {
                //         acc[m[3]] = acc[m[1]] | acc[m[2]];
                //     } else if (m = i.match(/^(\w+)\sLSHIFT\s(\d+)\s->\s(\w+)$/)) {
                //         acc[m[3]] = acc[m[1]] << parseInt(m[2]);
                //     } else if (m = i.match(/^(\w+)\sRSHIFT\s(\d+)\s->\s(\w+)$/)) {
                //        acc[m[3]] = acc[m[1]] >> parseInt(m[2]);
                //    } else if (m = i.match(/^NOT\s(\w+)\s->\s(\w+)$/)) {
                //         acc[m[2]] = acc[m[1]] ^ 65535;
                //    } else {
                //        console.log('NOT MATCHED');
                //        console.log(i);
                //    }

                   return acc;
                }, {});

const activate = (circuit) => {
    // console.log(circuit);
    if (_.all(circuit, c => c.active)) return circuit;

    return activate(_.mapValues(circuit, v => {
        if (v.active) return v;

        console.log(v);
        if (v.value[0] === '->' && circuit[v.value[1]].active) {
            return {
                active: true,
                value:  parseInt(circuit[v.value[1]].value)
            };
        } else if (v.value[0] === '&' && circuit[v.value[1]].active && circuit[v.value[2]].active) {
            return {
                active: true,
                value:  circuit[v.value[1]].value & circuit[v.value[2]].value
            };
        } else if (v.value[0] === '|' && circuit[v.value[1]].active && circuit[v.value[2]].active) {
            return {
                active: true,
                value:  circuit[v.value[1]].value | circuit[v.value[2]].value
            };
        } else if (v.value[0] === '<<' && circuit[v.value[1]].active) {
            return {
                active: true,
                value:  circuit[v.value[1]].value << v.value[2]
            };
        } else if (v.value[0] === '>>' && circuit[v.value[1]].active) {
            return {
                active: true,
                value:  circuit[v.value[1]].value >> v.value[2]
            };
        }  else if (v.value[0] === '^' && circuit[v.value[1]].active) {
            return {
                active: true,
                value:  circuit[v.value[1]].value ^ 65535
            };
        }

        return v;
    }));
};

console.log(activate(circuit));
// console.log(activate(circuit));
