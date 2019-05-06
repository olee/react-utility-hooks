import { useState, Dispatch, SetStateAction } from 'react';
import { useConstant, unwrapSetStateAction } from './index';

export default function useMappedState<TValue, TMapped>(mapValue: (value: TValue, previousValue?: TValue, previousMapped?: TMapped) => TMapped, initialValue: TValue | (() => TValue)) {
    // tslint:disable-next-line:prefer-const
    let [state, setInternalState] = useState<TMapped>(() => {
        const newValue = unwrapSetStateAction(initialValue, undefined);
        return mapValue(newValue, undefined, undefined);
    });
    let previousValue: TValue | undefined;
    const setState = useConstant((value: SetStateAction<TValue>) => {
        value = unwrapSetStateAction(value, previousValue);
        state = mapValue(value, previousValue, state);
        setInternalState(state);
        previousValue = value;
    });
    return [state, setState] as [TMapped, Dispatch<SetStateAction<TValue>>];
}
