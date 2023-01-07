import assert from 'node:assert/strict'
import test from 'node:test'
import {parseSelector} from './index.js'
import * as mod from './index.js'

test('parseSelector()', () => {
  assert.deepEqual(
    Object.keys(mod).sort(),
    ['parseSelector'],
    'should expose the public api'
  )

  assert.deepEqual(
    parseSelector(),
    {
      type: 'element',
      tagName: 'div',
      properties: {},
      children: []
    },
    'should return an empty element without selector'
  )

  assert.deepEqual(
    parseSelector('foo'),
    {
      type: 'element',
      tagName: 'foo',
      properties: {},
      children: []
    },
    'should return an element with a tag-name when given a tag-name'
  )

  assert.deepEqual(
    parseSelector(null, 'g'),
    {
      type: 'element',
      tagName: 'g',
      properties: {},
      children: []
    },
    'should return an `defaultTagName` if no tag name is defined in `selector` (#1)'
  )

  assert.deepEqual(
    parseSelector('#id', 'g'),
    {
      type: 'element',
      tagName: 'g',
      properties: {id: 'id'},
      children: []
    },
    'should return an `defaultTagName` if no tag name is defined in `selector` (#2)'
  )

  assert.deepEqual(
    parseSelector('.bar'),
    {
      type: 'element',
      tagName: 'div',
      properties: {className: ['bar']},
      children: []
    },
    'should return a `div` element when given a class'
  )

  assert.deepEqual(
    parseSelector('#bar'),
    {
      type: 'element',
      tagName: 'div',
      properties: {id: 'bar'},
      children: []
    },
    'should return a `div` element when given an ID'
  )

  assert.deepEqual(
    parseSelector('foo#bar.baz.qux'),
    {
      type: 'element',
      tagName: 'foo',
      properties: {
        id: 'bar',
        className: ['baz', 'qux']
      },
      children: []
    },
    'should return attributes'
  )

  assert.deepEqual(
    parseSelector('foo#bar#baz'),
    {
      type: 'element',
      tagName: 'foo',
      properties: {id: 'baz'},
      children: []
    },
    'should return the last ID if multiple are found'
  )

  assert.deepEqual(
    parseSelector('Foo'),
    {
      type: 'element',
      tagName: 'Foo',
      properties: {},
      children: []
    },
    'should *not* case the tag-name'
  )
})
