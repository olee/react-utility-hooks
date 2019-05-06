import useMappedState from './useMappedState';
import useStateAdvanced from './useWrappedState';

function getInitialValueFromLocalStorage<T>(initialValue: T | (() => T), key: string) {
    // Try to read last state from localStorage (if supported)
    if (typeof window === 'object') {
        const localStorageValue = window.localStorage.getItem(key);
        if (localStorageValue) {
            try {
                return JSON.parse(localStorageValue) as T;
            } catch (error) { /* nop */ }
        }
    }
    return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
}

/**
 * Custom useState which loads initial value from localStorage and uses initialValue otherwise.
 * Uses useMappedState, consuming 2 hooks.
 * @param  initialValue Initial value if value cannot be loaded from localStorage
 * @param  key          Key for localStorage access
 * @return              Tuple of [value, setValue]
 */
export default function useLocalStorageState<T>(initialValue: T | (() => T), key: string) {
    return useMappedState(v => {
        // Store value to localStorage when modified (if supported)
        if (typeof window === 'object')
            window.localStorage.setItem(key, JSON.stringify(v));
        return v;
    }, () => getInitialValueFromLocalStorage(initialValue, key));
}

/**
 * Custom useState which loads initial value from localStorage and uses initialValue otherwise.
 * Also allows accessing previous value.
 * Uses useStateAdvanced, consuming 1 hook only.
 * @param  initialValue Initial value if value cannot be loaded from localStorage
 * @param  key          Key for localStorage access
 * @return              Tuple of [value, setValue, previousValue]
 */
export function useLocalStorageStateWithPrevious<T>(initialValue: T | (() => T), key: string) {
    return useStateAdvanced((v, s, p) => {
        // Store state to localStorage when modified (if supported)
        if (typeof window === 'object')
            window.localStorage.setItem(key, JSON.stringify(v));
        return [v, s, p] as [typeof v, typeof s, typeof p];
    }, () => getInitialValueFromLocalStorage(initialValue, key));
}
