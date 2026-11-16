import { describe, expect, test } from 'vitest';
import { shuffledCopy } from './ArrayUtils.ts';

describe('shuffledCopy', () => {
    test('liefert eine neue Liste mit denselben Elementen', () => {
        const originalValues = [1, 2, 3, 4, 5];
        const shuffledValues = shuffledCopy(originalValues);

        expect(shuffledValues).not.toBe(originalValues);
        expect([...shuffledValues].sort()).toEqual([...originalValues].sort());
    });

    test('verändert das ursprüngliche Array nicht', () => {
        const originalValues = ['A', 'B', 'C', 'D', 'E', 'F'];
        const originalSnapshot = [...originalValues];

        shuffledCopy(originalValues);

        expect(originalValues).toEqual(originalSnapshot);
    });

    test('verarbeitet auch eine leere Liste', () => {
        expect(shuffledCopy([])).toEqual([]);
    });
});
