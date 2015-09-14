
var iterateCayleyDickson = require('cayley-dickson'),
    ring          = require('algebra-ring'),
    test          = require('tape')

var field = {
  zero: 0,
  one : 1,
  equality       : function equality (a, b) { return a === b },
  contains       : function contains (a) { return (typeof a === 'number' && isFinite(a)) },
  addition       : function addition (a, b) { return a + b },
  negation       : function negation (a) { return -a },
  multiplication : function multiplication (a, b) { return a * b },
  inversion      : function inversion (a) { return 1 / a }
}

test('cayley-dickson', function (t) {
  t.plan(1)

  // Real numbers.
  var R = iterateCayleyDickson(field, 0)

  t.equal(R.addition(1, 2), 3)

  // Complex numbers.
  var C = iterateCayleyDickson(field, 1)

  // Quaternion numbers.
  var H = iterateCayleyDickson(field, 2)

  // Octonions numbers.
  var O = iterateCayleyDickson(field, 3)
})

