import { useState, Dispatch, SetStateAction } from 'react';
import { unwrapSetStateAction } from './index';

/**
 * Replacement for useState which allows running hooks or transformations on commited values.
 * This allows for example executing actions on calls to setValue or storing additional information (like previousValue) in the state as well.
 * The default transform callback looks like `(v, s, p) => [v, s, p] as [typeof v, typeof s, typeof p]`.
 * Be sure to return a typed tuple and not a loose array as result to prevent destructuring issues later on.
 * @return wrapped state
 */
export default function useStateAdvanced<T, TResult>(getState: (value: T, setValue: Dispatch<SetStateAction<T>>, previousValue: T | undefined) => TResult, initialValue: T | (() => T)) {
    function createSetValueDispatch(previousValue: T) {
        return function setValue(value: SetStateAction<T>) {
            value = unwrapSetStateAction(value, previousValue);
            setWrappedValue(getState(value, createSetValueDispatch(value), previousValue));
        };
    }
    const [wrappedValue, setWrappedValue] = useState(() => {
        initialValue = unwrapSetStateAction(initialValue, undefined);
        return getState(initialValue, createSetValueDispatch(initialValue), undefined);
    });
    return wrappedValue;
}
