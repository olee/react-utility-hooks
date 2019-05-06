import { useState } from 'react';
import { useConstantFactory } from './';

export default function useMap<TKey extends keyof any, TValue>(initialState?: Record<TKey, TValue> | (() => Record<TKey, TValue>)) {
    const [state, setState] = useState<Record<TKey, TValue>>(initialState || {} as Record<TKey, TValue>);
    const actions = useConstantFactory(() => ({
        clear: () => setState({} as Record<TKey, TValue>),
        reset: () => setState(initialState || {} as Record<TKey, TValue>),
        set: (key: TKey, value: TValue) => setState(prevState => ({ ...prevState as any, [key]: value } as Record<TKey, TValue>)),
        toggle: (key: TKey) => setState(prevState => ({ ...prevState as any, [key]: !prevState[key] as any } as Record<TKey, TValue>)),
        remove: (key: TKey) => setState(prevState => {
            if (!prevState.hasOwnProperty(key))
                return prevState;
            const newState = { ...prevState as any };
            delete newState[key];
            return newState;
        }),
    }));
    return {
        value: state,
        ...actions,
    };
}
