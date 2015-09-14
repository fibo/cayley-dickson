
var ring = require('algebra-ring')

var twoPow = Math.pow.bind(null, 2)

/**
 * Turn unary operator on single value to operator on n values.
 */

function arrayfy1 (operator, dim) {
   return function (a) {
     var b = []

     for (var i = 0; i < dim; i++)
       b.push(operator(a[i]))

     return b
   }
}

/**
 * Turn binary operator on single value to operator on n values.
 */

function arrayfy2 (operator, dim) {
   return function (a, b) {

     var c = []

     for (var i = 0; i < dim; i++)
       c.push(operator(a[i], b[i]))

     return c
   }
}

/**
 * Iterate Cayley-Disckson construction
 *
 * @params {Object} given field
 * @params {*} given.zero
 * @params {*} given.one
 * @params {Function} given.equality
 * @params {Function} given.contains
 * @params {Function} given.addition
 * @params {Function} given.negation
 * @params {Function} given.multiplication
 * @params {Function} given.inversion
 * @params {Number} iterations
 *
 * @returns {Object} algebra
 */

function iterateCayleyDickson (given, iterations) {
  var field = ring([given.zero, given.one], given)

  if (iterations === 0)
    return field

   var fieldZero           = field.zero,
       fieldOne            = field.one,
       fieldAddition       = field.addition,
       fieldMultiplication = field.multiplication,
       fieldNegation       = field.negation,
       fieldDisequality    = field.disequality,
       fieldNotContains    = field.notContains

  // identities

  var one  = [],
      zero = [],
      dim  = twoPow(iterations)

  one.push(fieldOne)
  zero.push(fieldZero)

  for (var i = 1; i < dim; i++) {
    one.push(fieldZero)
    zero.push(fieldZero)
  }

  // operators

  function equality (a, b) {
    for (var i = 0; i < dim; i++)
      if (fieldDisequality(a[i], b[i]))
        return false

    return true
  }

  function contains (a) {
    for (var i = 0; i < dim; i++)
      if (fieldNotContains(a[i]))
        return false

    return true
  }

  function buildConjugation (fieldNegation, iterations) {
    if (iterations === 0)
      return function (a) { return a }

    var dim = twoPow(iterations)

    // b -> p looks like complex conjugation simmetry (:
    function conjugation (b) {
      var p = [b[0]],
          i

      // First, copy half of b into q.
      for (i = 1; i < dim; i++)
        p.push(fieldNegation(b[i]))

      return p
    }

    return conjugation
  }

  var conjugation = buildConjugation(fieldNegation, iterations)

  function buildMultiplication (fieldAddition, fieldNegation, fieldMultiplication, iterations) {
    if (iterations === 0)
      return function (a, b) { return [fieldMultiplication(a, b)] }

    var dim     = twoPow(iterations),
        halfDim = twoPow(iterations - 1)

    var add  = arrayfy2(fieldAddition, halfDim),
        conj = buildConjugation(fieldNegation, iterations -1),
        mul  = buildMultiplication(fieldAddition, fieldNegation, fieldMultiplication, iterations - 1),
        neg  = arrayfy1(fieldNegation, halfDim)

    function multiplication (a, b) {
      var c = []

      //         a = (p, q)
      //         +    +  +
      //         b = (r, s)
      //         =    =  =
      // a + b = c = (t, u)

      var p = [], q = [],
          r = [], s = []

      for (var i1 = 0; i1 < halfDim; i1++) {
        p.push(a[i1])
        r.push(b[i1])
      }

      for (var i2 = halfDim; i2 < dim; i2++) {
        q.push(a[i2])
        s.push(b[i2])
      }

      // let denote conj(x) as x`
      //
      // Multiplication law is given by
      //
      // (p, q)(r, s) = (pr - s`q, sp + qr`)

      var t = add(mul(p, r), neg(mul(conj(s), q))),
          u = add(mul(s, p), mul(q, conj(r)))

      for (var i3 = 0; i3 < halfDim; i3++)
        c.push(t[i3])

      for (var i4 = 0; i4 < halfDim; i4++)
        c.push(u[i4])

      return c
    }

    return multiplication
  }

  var multiplication = buildMultiplication(fieldAddition, fieldNegation, fieldMultiplication, iterations)

  function norm (a) {
    var n       = fieldZero,
        squares = multiplication(a, conjugation(a))

    for (var i = 0; i < dim; i++)
      n = fieldAddition(n, squares[i])

    return n
  }

  function inversion (a) {
    var n = norm(a)

    var b = conjugation(a)

    for (var i = 0; i < dim; i++)
      b[i] = field.division(b[i], n)

    return b
  }

  var addition = arrayfy2(fieldAddition, dim),
      negation = arrayfy1(fieldNegation, dim)

  // Cayley-Dickson construction take a field as input but the result can be often a ring,
  // this means that it can be *not-commutative*.
  // To elevate it to an algebra, we need a bilinear form wich is given by the norm.
  var algebra = ring([zero, one], {
    contains       : contains,
    equality       : equality,
    addition       : addition,
    negation       : negation,
    multiplication : multiplication,
    inversion      : inversion
  })

  algebra.conjugation = conjugation
  algebra.norm        = norm

  return algebra
}

module.exports = iterateCayleyDickson

