import { useState, useRef, SetStateAction } from 'react';
import { useConstant, unwrapSetStateAction } from './index';

export default function useRefState<T>(initialValue: T | (() => T)) {
    const [innerState, setInnerState] = useState(initialValue);
    const stateRef = useRef(innerState);
    const setState = useConstant((value: SetStateAction<T>) =>
        setInnerState((previousValue) =>
            stateRef.current = unwrapSetStateAction(value, previousValue)
        )
    );
    return [stateRef, setState] as const;
}
