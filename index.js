'use strict';

/* Expose. */
module.exports = parse;

/* Parse a simple CSS selector into a HAST node. */
function parse(selector) {
  var index = 0;
  var className = [];

  var type;
  var lastIndex;

  var node = {
    type: 'element',
    tagName: 'div',
    properties: {},
    children: []
  };

  selector = selector || '';

  while (index <= selector.length) {
    var ch = selector[index++];

    if (!ch || ch === '.' || ch === '#') {
      var subvalue = selector.slice(lastIndex, index - 1);

      if (subvalue) {
        if (type === '.') {
          className.push(subvalue);
        } else if (type === '#') {
          node.properties.id = subvalue;
        } else {
          node.tagName = subvalue;
        }
      }

      lastIndex = index;
      type = ch;
    }
  }

  if (className.length) { // eslint-disable-line unicorn/explicit-length-check
    node.properties.className = className;
  }

  return node;
}
