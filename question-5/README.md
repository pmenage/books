# Bonus Question

The algorithm should work for two operations which move the cursor and insert a string. If there are more actions in the operation, the functions will not work correctly.

The assertion `expect(combined2.apply(s)).to.equal(combined1.apply(s));` in our example will not be true if the two operations are inserting a string at the same caret.

If we have:
```javascript
const op1 = new Operation([{ move: 1 }, { insert: "FOO" }]);
const op2 = new Operation([{ move: 1 }, { insert: "BAR" }]);
```

The result for `op1,op2` will be 'aBARFOObcdefg', while the result for `op2, op1` will be 'aFOOBARbcdefg'.