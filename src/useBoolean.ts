import { useState, useMemo } from 'react';

/**
 * Provides boolean state with various bound utility functions
 * @return Object of { value, setValue, toggle, set, clear, reset }
 */
export default function useBoolean(initialValue: boolean | (() => boolean) = false) {
    const [value, setValue] = useState(initialValue);
    const callbacks = useMemo(() => ({
        toggle: () => setValue(prev => !prev),
        set: () => setValue(true),
        clear: () => setValue(false),
        reset: () => setValue(typeof initialValue === 'function' ? initialValue() : initialValue),
    }), []);
    return {
        ...callbacks,
        setValue,
        value,
    };
}
