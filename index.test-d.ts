import type {Element} from 'hast'
import {expectAssignable, expectType} from 'tsd'
import {parseSelector} from './index.js'

type A = Element & {tagName: 'a'}
type Div = Element & {tagName: 'div'}
type G = Element & {tagName: 'g'}

// No tag name.
expectType<Div>(parseSelector(''))
expectType<Div>(parseSelector('#id'))
expectType<Div>(parseSelector('.class'))
expectType<Div>(parseSelector('#id.class'))
expectType<Div>(parseSelector('.class#id'))

// A tag name.
expectType<A>(parseSelector('a'))
expectType<A>(parseSelector('a#id'))
expectType<A>(parseSelector('a.class'))
expectType<A>(parseSelector('a#id.class'))
expectType<A>(parseSelector('a.class#id'))

// A default tag name
expectType<G>(parseSelector('', 'g'))
expectType<G>(parseSelector('#id', 'g'))
expectType<G>(parseSelector('.class', 'g'))
expectType<G>(parseSelector('#id.class', 'g'))
expectType<G>(parseSelector('.class#id', 'g'))

// They’re still elements.
expectAssignable<Element>(parseSelector(''))
expectAssignable<Element>(parseSelector('', 'g'))
expectAssignable<Element>(parseSelector('a'))
