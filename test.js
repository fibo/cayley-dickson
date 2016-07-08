var iterateCayleyDickson = require('cayley-dickson')
var test = require('tape')

var real = {
  zero: 0,
  one: 1,
  equality: function equality (a, b) { return a === b },
  contains: function contains (a) { return (typeof a === 'number' && isFinite(a)) },
  addition: function addition (a, b) { return a + b },
  negation: function negation (a) { return -a },
  multiplication: function multiplication (a, b) { return a * b },
  inversion: function inversion (a) { return 1 / a }
}

test('Real', function (t) {
  var R = iterateCayleyDickson(real, 0)

  t.ok(R.equality(2, 2))
  t.ok(R.disequality(1, 2))
  t.ok(R.contains(Math.PI))
  t.ok(R.notContains(Infinity))
  t.equal(R.addition(1, 2), 3)
  t.equal(R.subtraction(1, 2), -1)
  t.equal(R.negation(2), -2)
  t.equal(R.multiplication(-3, 2), -6)
  t.equal(R.division(10, 2), 5)
  t.equal(R.inversion(2), 0.5)

  t.equal(R.addition(1, 2, 3), 6)
  t.equal(R.subtraction(10, 5, 5, 5), -5)
  t.equal(R.multiplication(2, 3, 4, 5), 120)
  t.equal(R.division(36, 2, 3), 6)

  t.end()
})

test('Complex', function (t) {
  var C = iterateCayleyDickson(real, 1)

  t.ok(C.equality([1, 2], [1, 2]))
  t.ok(C.disequality([1, 2], [0, 1]))
  t.ok(C.contains([Math.PI, 2]))
  t.ok(C.notContains(1))
  t.deepEqual(C.addition([1, 2], [-1, 2], [2, 2]), [2, 6])
  t.deepEqual(C.subtraction([1, 1], [2, 3]), [-1, -2])
  t.deepEqual(C.negation([1, 2]), [-1, -2])
  t.deepEqual(C.multiplication([1, 2], [1, -2]), [5, 0])
  t.deepEqual(C.division([5, 0], [1, 2]), [1, -2])
  t.deepEqual(C.inversion([0, 2]), [0, -0.5])

  t.end()
})

test('Quaternion', function (t) {
  var H = iterateCayleyDickson(real, 2)

  var minusOne = [-1, 0, 0, 0]

  var i = [0, 1, 0, 0]
  var j = [0, 0, 1, 0]
  var k = [0, 0, 0, 1]

  t.ok(H.equality(H.multiplication(i, i), minusOne))
  t.ok(H.equality(H.multiplication(j, j), minusOne))
  t.ok(H.equality(H.multiplication(k, k), minusOne))

  t.deepEqual(H.subtraction(H.multiplication(i, j, k), minusOne), [0, 0, 0, 0])

  t.end()
})

// Octonion numbers.
// TODO var O = iterateCayleyDickson(real, 3)

// Sedenion numbers.
// TODO var S = iterateCayleyDickson(real, 4)
