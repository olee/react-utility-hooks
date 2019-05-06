import { useState, useRef, SetStateAction } from 'react';
import { useConstant, unwrapSetStateAction } from './index';
import useStateAdvanced from './useWrappedState';
import useMappedState from './useMappedState';

/**
 * Drop-in replacement for react useState which also returns previousValue.
 * Uses useStateAdvanced, consuming 1 hook only.
 * @return [value, setValue, previousValue]
 */
export default function useStateWithPrevious<T>(initialValue: T | (() => T)) {
    return useStateAdvanced((v, s, p) => [v, s, p] as [typeof v, typeof s, typeof p], initialValue);
}

/**
 * Drop-in replacement for react useState which also returns previousValue.
 * Uses useMappedState, consuming 2 hooks.
 * @return [value, setValue, previousValue]
 */
export function useStateWithPrevious_mappedState<T>(initialValue: T | (() => T)) {
    const [state, setState] = useMappedState((v, p) => [v, p] as [typeof v, typeof p], initialValue);
    return [state[0], setState, state[1]];
}

/**
 * Drop-in replacement for react useState which also returns previousValue.
 * Uses classic useState only, consuming 3 hooks.
 * @return [value, setValue, previousValue]
 */
export function useStateWithPrevious_classic<T>(initialValue: T | (() => T)) {
    const [currentValue, setCurrentValue] = useState(initialValue);
    const previousValueRef = useRef<T | undefined>(undefined);
    const setValue = useConstant((newValue: SetStateAction<T>) => {
        setCurrentValue((previousValue) => {
            newValue = unwrapSetStateAction(newValue, previousValue);
            previousValueRef.current = previousValue;
            return newValue;
        });
    });
    return [currentValue, setValue, previousValueRef.current];
}
