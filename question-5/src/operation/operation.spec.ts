import { Operation } from './operation';

// Faire tests aux bords
// Faire tests avec plusieurs operations

test('combination of op1 and op2 should be true', () => {
    // Given
    const op1 = new Operation([{ move: 1 }, { insert: 'FOO' }]);
    const op2 = new Operation([{ move: 3 }, { insert: 'BAR' }]);

    // When
    const op1op2 = Operation.combine(op1, op2);

    // Then
    expect(op1op2.actions).toEqual([{ move: 1 }, { insert: 'FOO' }, { move: 2 }, { insert: 'BAR' }]);
});

test('combination of op2 and op1 should be true', () => {
    // Given
    const op1 = new Operation([{ move: 1 }, { insert: 'FOO' }]);
    const op2 = new Operation([{ move: 3 }, { insert: 'BAR' }]);

    // When
    const op2op1 = Operation.combine(op2, op1);

    // Then
    expect(op2op1.actions).toEqual([{ move: 3 }, { insert: 'BAR' }, { move: -5 }, { insert: 'FOO' }]);
});

test('apply op1 should be true', () => {
    // Given
    const s = 'abcdefg';
    const o1 = new Operation([{ move: 1 }, { insert: 'FOO' }]);

    // When
    const s1 = o1.apply(s);

    // Then
    expect(s1).toBe('aFOObcdefg');
});

test('apply op2 should be true', () => {
    // Given
    const s = 'abcdefg';
    const o2 = new Operation([{ move: 3 }, { insert: 'BAR' }]);

    // When
    const s1 = o2.apply(s);

    // Then
    expect(s1).toBe('abcBARdefg');
});


test('apply out of bounds operation should throw error', () => {
    // Given
    const s = 'abcdefg';
    const op2op1 = new Operation([{ move: 30 }, { insert: 'BAR' }]);

    // When
    const applyFunction = () => op2op1.apply(s)

    // Then
    expect(applyFunction).toThrow('Cursor is out of bounds');
});

test('apply invalid action should throw error', () => {
    // Given
    const s = 'abcdefg';
    const op1 = new Operation([{ move: 30, insert: 'FOO' }]);
    const op2 = new Operation([{ move: 30 }, { insert: 'BAR' }]);

    // When
    const applyFunction = () => op1.combine(op2);

    // Then
    expect(applyFunction).toThrow('Action should be either move or insert');
});

test('apply combination of op1 and op2 should be true', () => {
    // Given
    const s = 'abcdefg';
    const op1op2 = new Operation([{ move: 1 }, { insert: 'FOO' }, { move: 2 }, { insert: 'BAR' }]);

    // When
    const s1 = op1op2.apply(s);

    // Then
    expect(s1).toBe('aFOObcBARdefg');
});

test('apply combination of op2 and op1 should be true', () => {
    // Given
    const s = 'abcdefg';
    const op2op1 = new Operation([{ move: 3 }, { insert: 'BAR' }, { move: -5 }, { insert: 'FOO' }]);

    // When
    const s1 = op2op1.apply(s);

    // Then
    expect(s1).toBe('aFOObcBARdefg');
});