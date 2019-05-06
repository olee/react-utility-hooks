import { useState } from 'react';

export default function usePartialSetState<T>(initialState: T | (() => T)) {
    const [state, setState] = useState<T>(initialState);
    function setPartialState(partialState: Partial<T> | ((prevState: T) => Partial<T>)) {
        setState(prevState => ({
            // TODO: Remove any with typescript ^3.2.2 
            ...prevState as any,
            ...(typeof partialState === 'function' ? partialState(prevState) : partialState) as any,
        }));
    }
    return [state, setPartialState] as [typeof state, typeof setPartialState];
}
