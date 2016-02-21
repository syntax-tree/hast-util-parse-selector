# hast-util-parse-selector [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Parse a simple CSS selector to a HAST node.

## Installation

[npm][npm-install]:

```bash
npm install hast-util-parse-selector
```

**hast-util-parse-selector** is also available as an AMD, CommonJS, and globals
module, [uncompressed and compressed][releases].

## Usage

Dependencies:

```javascript
var parseSelector = require('hast-util-parse-selector');
```

Parse:

```javascript
var node = parseSelector('.quux#bar.baz.qux');
```

Yields:

```json
{
  "type": "element",
  "tagName": "div",
  "properties": {
    "id": "bar",
    "className": [
      "quux",
      "baz",
      "qux"
    ]
  },
  "children": []
}
```

## API

### `parseSelector([selector])`

Parse a CSS `selector` to a [HAST][] [node][hast-node].

**selector** (`string`, optional).  Can contain a tag-name (`foo`),
classes (`.bar`), and an ID (`#baz`).
Multiple classes are allowed.  Uses the last ID if multiple IDs are
found.

**Returns**: [`Node`][hast-node] — A HAST node.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/hast-util-parse-selector.svg

[travis]: https://travis-ci.org/wooorm/hast-util-parse-selector

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/hast-util-parse-selector.svg

[codecov]: https://codecov.io/github/wooorm/hast-util-parse-selector

[npm-install]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/hast-util-parse-selector/releases

[license]: LICENSE

[author]: http://wooorm.com

[hast]: https://github.com/wooorm/hast

[hast-node]: https://github.com/wooorm/hast#node
