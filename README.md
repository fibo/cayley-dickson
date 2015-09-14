# cayley-dickson

> [Cayley-Dickson construction][1] to produce a sequence of algebras over a field


## Usage

Define real operators, see also [algebra-ring][2]. Note that you could use any operators definition, for instance using a *big numbers* lib.

```
var real = {
  zero: 0,
  one : 1,
  equality       : function equality (a, b) { return a === b },
  contains       : function contains (a) { return (typeof a === 'number' && isFinite(a)) },
  addition       : function addition (a, b) { return a + b },
  negation       : function negation (a) { return -a },
  multiplication : function multiplication (a, b) { return a * b },
  inversion      : function inversion (a) { return 1 / a }
}
```

Now you can use [Cayley-Dickson][1] constructions to build algebras. Every iteration doubles the dimension. Let's take a trip through Cayley-Dickson algebras.

Well, iteration 0 gives the common Real numbers. The result is just the return value of the [algebra-ring][2] function, nothing really exciting.

```
// Real numbers.
var R = iterateCayleyDickson(real, 0)

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

First iteration gives Complex numbers, they are a field like the Real numbers.

```
// Complex numbers.
var C = iterateCayleyDickson(real, 1)

C.equality([1, 2], [1, 2]) // true
C.disequality([1, 2], [0, 1]) // true
C.contains([Math.PI, 2]) // true
C.notContains(1) // true
C.addition([1, 2], [-1, 2]) // [0, 4]
C.subtraction([1, 1], [2, 3]) // [-1, -2]
C.negation([1, 2]) // [-1, -2]
C.multiplication([1, 2], [1, -2]) // [5, 0]
C.division([5, 0], [1, 2]) // [1, -2]
C.inversion([0, 2]) // [0, -0.5]
```

Second iteration gives Quaternion numbers, usually denoted as *H* in honour of sir Hamilton.
Here you loose commutativity.
They are used in computer graphics cause rotations are far easier to manipulate in this land.

** TODO ** add tests and examples

```
// Quaternion numbers.
var H = iterateCayleyDickson(real, 2)
```

Third iteration gives Octonion numbers.
Here you loose associativity.
A byte could be seen as an octonion of bits, which should define a new kind of bit operator.

** TODO ** add tests and examples

```
// Octonion numbers.
var O = iterateCayleyDickson(real, 3)
```

Fourth iteration gives Sedenions, that are out of my scope sincerely. They are not a division ring, there are elements that divide zero :@

```
// Sedenion numbers.
var S = iterateCayleyDickson(real, 4)
```

  [1]: https://en.wikipedia.org/wiki/Cayley%E2%80%93Dickson_construction "Cayley-Dickson construction"
  [2]: http://npm.im/algebra-ring "algebra-ring"

