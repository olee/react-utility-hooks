import { useRef, useEffect } from "react";

export default function usePropChangeLogger(props: Record<keyof any, any>, message: string = '[usePropChangeLogger]') {
    const previousProps = useRef(props);
    useEffect(() => {
        if (previousProps.current && previousProps.current !== props) {
            const changes: Record<keyof any, { from: any; to: any; }> = {};
            Object.keys({ ...previousProps.current, ...props }).forEach(key => {
                if (previousProps.current[key] !== props[key]) {
                    changes[key] = {
                        from: previousProps.current[key],
                        to: props[key],
                    };
                }
            });
            if (Object.keys(changes).length) {
                console.log(message, changes);
            }
        }
        previousProps.current = props;
    });
}
