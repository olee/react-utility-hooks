import { useState, useMemo } from 'react';

/**
 * Provides a number state with various bound utility functions
 * @return Object of { value, setValue, inc, dec, reset }
 */
export default function useNumber(initialValue: number | (() => number) = 0, stepSize = 1) {
    const [value, setValue] = useState(initialValue);
    const callbacks = useMemo(() => ({
        inc: () => setValue(prev => prev + stepSize),
        dec: () => setValue(prev => prev - stepSize),
        reset: () => setValue(typeof initialValue === 'function' ? initialValue() : initialValue),
    }), [stepSize]);
    return {
        ...callbacks,
        setValue,
        value,
    };
}
