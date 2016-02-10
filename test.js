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

test('cayley-dickson', function (t) {
  t.plan(20)

  // Real numbers.
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

  // Complex numbers.
  var C = iterateCayleyDickson(real, 1)

  t.ok(C.equality([1, 2], [1, 2]))
  t.ok(C.disequality([1, 2], [0, 1]))
  t.ok(C.contains([Math.PI, 2]))
  t.ok(C.notContains(1))
  t.deepEqual(C.addition([1, 2], [-1, 2]), [0, 4])
  t.deepEqual(C.subtraction([1, 1], [2, 3]), [-1, -2])
  t.deepEqual(C.negation([1, 2]), [-1, -2])
  t.deepEqual(C.multiplication([1, 2], [1, -2]), [5, 0])
  t.deepEqual(C.division([5, 0], [1, 2]), [1, -2])
  t.deepEqual(C.inversion([0, 2]), [0, -0.5])

  // Quaternion numbers.
  // TODO var H = iterateCayleyDickson(real, 2)

  // Octonion numbers.
  // TODO var O = iterateCayleyDickson(real, 3)

  // Sedenion numbers.
  // TODO var S = iterateCayleyDickson(real, 4)
})
