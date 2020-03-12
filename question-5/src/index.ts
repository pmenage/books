import { Operation } from './operation/operation';

const s = 'abcdefg';
const op1 = new Operation([{ move: 1 }, { insert: 'FOO' }]);
const op2 = new Operation([{ move: 3 }, { insert: 'BAR' }]);

op1.apply(s); // => 'aFOObcdefg'
op2.apply(s); // => 'abcBARdefg'

const combined1 = Operation.combine(op1, op2); // => [{ move: 1 }, { insert: 'FOO' }, { move: 2}, { insert: 'BAR' } ]
console.log(combined1.apply(s)); // => 'aFOObcBARdefg'

const combined2 = Operation.combine(op2, op1);
console.log(combined2.apply(s));
// NB: This expectation is true for this specific case, but not in the general case.
// Can you think of an example where this assertion might not be true?
// expect(combined2.apply(s)).to.equal(combined1.apply(s));