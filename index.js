/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module hast:util:parse-selector
 * @fileoverview Parse a simple CSS selector to a HAST node.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Characters
 */

var CC_DOT = '.'.charCodeAt(0);
var CC_HASH = '#'.charCodeAt(0);

/**
 * Parse a simple CSS selector into a HAST node.
 *
 * @example
 *   parse('foo#bar.baz.qux');
 *   // {
 *   //   'type': 'element',
 *   //   'tagName': 'foo',
 *   //   'properties': {
 *   //     'id': 'bar',
 *   //     'className': ['baz', 'qux']
 *   //   },
 *   //   'children': []
 *   // }
 *
 * @param {string?} selector - Simple CSS selector.
 * @return {Node} - HAST node.
 */
function parse(selector) {
    var id = null;
    var className = [];
    var value = selector || '';
    var name = 'div';
    var node;
    var type = null;
    var index = -1;
    var code;
    var length = value.length;
    var subvalue;
    var lastIndex;

    node = {
        'type': 'element',
        'tagName': null,
        'properties': {},
        'children': []
    };

    type = null;

    while (++index <= length) {
        code = value.charCodeAt(index);

        if (!code || code === CC_DOT || code === CC_HASH) {
            subvalue = value.slice(lastIndex, index);

            if (subvalue) {
                if (type === CC_DOT) {
                    className.push(subvalue);
                } else if (type === CC_HASH) {
                    id = subvalue;
                } else {
                    name = subvalue;
                }
            }

            lastIndex = index + 1;
            type = code;
        }
    }

    node.tagName = name;

    if (id) {
        node.properties.id = id;
    }

    if (className.length) {
        node.properties.className = className;
    }

    return node;
}

/*
 * Expose.
 */

module.exports = parse;
