// Dependencies:
var parseSelector = require('./index.js');

// Parse:
var node = parseSelector('.quux#bar.baz.qux');

// Yields:
console.log('json', JSON.stringify(node, 0, 2));
