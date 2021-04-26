/**
 * @typedef {import('hast').Properties} Properties
 * @typedef {import('hast').Element} Element
 */

var search = /[#.]/g

/**
 * Create a hast element from a simple CSS selector.
 *
 * @param {string} [selector]
 * @param {string} [name='div']
 * @returns {Element}
 */
export function parseSelector(selector, name = 'div') {
  var value = selector || ''
  /** @type {Properties} */
  var props = {}
  var start = 0
  /** @type {string} */
  var subvalue
  /** @type {string} */
  var previous
  /** @type {RegExpMatchArray} */
  var match

  while (start < value.length) {
    search.lastIndex = start
    match = search.exec(value)
    subvalue = value.slice(start, match ? match.index : value.length)

    if (subvalue) {
      if (!previous) {
        name = subvalue
      } else if (previous === '#') {
        props.id = subvalue
      } else if (Array.isArray(props.className)) {
        props.className.push(subvalue)
      } else {
        props.className = [subvalue]
      }

      start += subvalue.length
    }

    if (match) {
      previous = match[0]
      start++
    }
  }

  return {type: 'element', tagName: name, properties: props, children: []}
}
