import assert from 'node:assert/strict'
import test from 'node:test'
import {parseSelector} from './index.js'

test('parseSelector()', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('./index.js')).sort(), [
      'parseSelector'
    ])
  })

  await t.test(
    'should return an empty element without selector',
    async function () {
      assert.deepEqual(parseSelector(), {
        type: 'element',
        tagName: 'div',
        properties: {},
        children: []
      })
    }
  )

  await t.test(
    'should return an element with a tag-name when given a tag-name',
    async function () {
      assert.deepEqual(parseSelector('foo'), {
        type: 'element',
        tagName: 'foo',
        properties: {},
        children: []
      })
    }
  )

  await t.test(
    'should return an `defaultTagName` if no tag name is defined in `selector` (#1)',
    async function () {
      assert.deepEqual(parseSelector(undefined, 'g'), {
        type: 'element',
        tagName: 'g',
        properties: {},
        children: []
      })
    }
  )

  await t.test(
    'should return an `defaultTagName` if no tag name is defined in `selector` (#2)',
    async function () {
      assert.deepEqual(parseSelector('#id', 'g'), {
        type: 'element',
        tagName: 'g',
        properties: {id: 'id'},
        children: []
      })
    }
  )

  await t.test(
    'should return a `div` element when given a class',
    async function () {
      assert.deepEqual(parseSelector('.bar'), {
        type: 'element',
        tagName: 'div',
        properties: {className: ['bar']},
        children: []
      })
    }
  )

  await t.test(
    'should return a `div` element when given an ID',
    async function () {
      assert.deepEqual(parseSelector('#bar'), {
        type: 'element',
        tagName: 'div',
        properties: {id: 'bar'},
        children: []
      })
    }
  )

  await t.test('should return attributes', async function () {
    assert.deepEqual(parseSelector('foo#bar.baz.qux'), {
      type: 'element',
      tagName: 'foo',
      properties: {
        id: 'bar',
        className: ['baz', 'qux']
      },
      children: []
    })
  })

  await t.test(
    'should return the last ID if multiple are found',
    async function () {
      assert.deepEqual(parseSelector('foo#bar#baz'), {
        type: 'element',
        tagName: 'foo',
        properties: {id: 'baz'},
        children: []
      })
    }
  )

  await t.test('should *not* case the tag-name', async function () {
    assert.deepEqual(parseSelector('Foo'), {
      type: 'element',
      tagName: 'Foo',
      properties: {},
      children: []
    })
  })
})
