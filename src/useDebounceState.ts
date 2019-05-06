import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

/**
 * useState alternative that debounces calls to setValue.
 * @return Array of [value, setValueDebounced, setValue]
 */
export function useDebounceState<T>(initialValue: T | (() => T), timeout: number = 200) {
    const [value, setValue] = useState(initialValue);
    const setValueDebounced = useCallback(debounce((v: T) => setValue(v), timeout), [timeout]);
    return [value, setValueDebounced, setValue] as const;
}
