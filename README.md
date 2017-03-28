# cayley-dickson

> implements [Cayley-Dickson construction][Cayley-Dickson] to produce a sequence of algebras over a field

[Installation](#installation) |
[Usage](#usage) :
[Real](#real) >
[Complex](#complex) >
[Quaternion](#quaternion) >
[Octonion](#octonion) >
[Sedenion](#sedenion) |
[License](#license)

[![NPM version](https://badge.fury.io/js/cayley-dickson.svg)](http://badge.fury.io/js/cayley-dickson) [![Build Status](https://travis-ci.org/fibo/cayley-dickson.svg?branch=master)](https://travis-ci.org/fibo/cayley-dickson?branch=master) [![Dependency Status](https://gemnasium.com/fibo/cayley-dickson.svg)](https://gemnasium.com/fibo/cayley-dickson)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Installation

With [npm](https://www.npmjs.com) do

```bash
npm install cayley-dickson
```

## Usage

Every code snippet below it is intended to be contained in a [single file](https://github.com/fibo/cayley-dickson/blob/master/test.js).

Define real operators, see also [algebra-ring]. Note that you could use any operators definition, for example using a *big numbers* lib.

```javascript
const real = {
  zero: 0,
  one: 1,
  equality: (a, b) => (a === b),
  contains: (a) => (typeof a === 'number' && isFinite(a)),
  addition: (a, b) => (a + b),
  negation: (a) => -a,
  multiplication: (a, b) => (a * b),
  inversion: (a) => (1 / a)
}
```

Import cayley-dickson.

```javascript
const iterateCayleyDickson = require('cayley-dickson')
```

Now you can use [Cayley-Dickson] constructions to build algebras.
Every iteration doubles the dimension.
Let's take a trip through Cayley-Dickson algebras.

### Real

> start from here

Well, iteration 0 gives the common Real numbers. The result is just the return value of the [algebra-ring] function, nothing really exciting.

```javascript
// Real numbers.
const R = iterateCayleyDickson(real, 0)

R.equality(2, 2) // true
R.disequality(1, 2) // true
R.contains(Math.PI) // true
R.notContains(Infinity) // true
R.addition(1, 2) // 3
R.subtraction(1, 2) // -1
R.negation(2) // -2
R.multiplication(-3, 2) // -6
R.division(10, 2) // 5
R.inversion(2) // 0.5
```

### Complex

> a beautiful plane

First iteration gives Complex numbers, they are a field like the Real numbers.

```javascript
// Complex numbers.
const C = iterateCayleyDickson(real, 1)

C.equality([1, 2], [1, 2]) // true
C.disequality([1, 2], [0, 1]) // true
C.contains([Math.PI, 2]) // true
C.notContains(1) // true
C.addition([1, 2], [-1, 2], [2, 2]) // [2, 6]
C.subtraction([1, 1], [2, 3]) // [-1, -2]
C.negation([1, 2]) // [-1, -2]
C.multiplication([1, 2], [1, -2]) // [5, 0]
C.division([5, 0], [1, 2]) // [1, -2]
C.inversion([0, 2]) // [0, -0.5]
C.conjugation([1, 2]) // [1, -2]
```

### Quaternion

> here you loose commutativity

Second iteration gives [Quaternion numbers](https://en.wikipedia.org/wiki/Quaternion),
usually denoted as ℍ in honour of sir Hamilton.
They are used in computer graphics cause rotations are far easier to manipulate in this land.

Let's check the famous formula for Quaternion multiplication `ijk = i² = j² = k² = -1`

![ijk-1]

```javascript
// Quaternion numbers.
const H = iterateCayleyDickson(real, 2)

const minusOne = new H([-1, 0, 0, 0])
j
const i = new H([0, 1, 0, 0])
const j = new H([0, 0, 1, 0])
const k = new H([0, 0, 0, 1])

H.equality(H.multiplication(i, i), minusOne) // true
H.equality(H.multiplication(j, j), minusOne) // true
H.equality(H.multiplication(k, k), minusOne) // true

// ijk - 1 = 0
H.subtraction(H.multiplication(i, j, k), minusOne) // [0, 0, 0, 0]
```

### Octonion

> here you loose associativity

Third iteration gives [Octonion numbers](https://en.wikipedia.org/wiki/Octonion).
A byte could be seen as an octonion of bits, which should define a new kind of bit operator.

```javascript
// Octonion numbers.
const O = iterateCayleyDickson(real, 3)

const minusOne = [-1, 0, 0, 0, 0, 0, 0, 0]

const i1 = [0, 1, 0, 0, 0, 0, 0, 0]

O.equality(O.multiplication(i1, i1), minusOne) // true

O.conjugation([1, 2, 3, 4, 5, 6, 7, 8]) // [1, -2, -3, -4, -5, -6, -7, -8]
```

### Sedenion

> hic sunt leones

Fourth iteration gives [Sedenion numbers](https://en.wikipedia.org/wiki/Sedenion),
that are out of my scope sincerely. They are not a division ring, there are elements that divide zero 😱.

```javascript
// Sedenion numbers.
const S = iterateCayleyDickson(real, 4)
```

## License

[MIT](http://g14n.info/mit-license)

[Cayley-Dickson]: https://en.wikipedia.org/wiki/Cayley%E2%80%93Dickson_construction "Cayley-Dickson construction"
[algebra-ring]: http://npm.im/algebra-ring "algebra-ring"
[ijk-1]: http://i.stack.imgur.com/eYs5r.jpg "ijk-1"
