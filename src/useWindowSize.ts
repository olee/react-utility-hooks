import { useState, useEffect } from 'react';

type Result = [number | undefined, number | undefined];

/**
 * Returns current window size and updates state if window if resized
 * @param  element            Optional element to use for accessing the window object instead of global window variable
 * @param  disableResizeEvent Disable the resize event and only get initial window size
 * @return [width, height]
 */
export default function useWindowSize(element?: HTMLElement | null, disableResizeEvent?: boolean): Result {
    // If we are not even in a browser environment, do not even useEffect - window size will always be undefined
    if (typeof window !== 'object')
        return [undefined, undefined];
    // Get reference to window objecz
    const wnd = element && element.ownerDocument && element.ownerDocument.defaultView || window;
    // Get / initialize state
    const [result, setSize] = useState<Result>([wnd && wnd.innerWidth, wnd && wnd.innerHeight]);
    useEffect(() => {
        if (typeof wnd === 'object') {
            const handleResize = () => setSize([wnd.innerWidth, wnd.innerHeight]);
            handleResize();
            if (!disableResizeEvent) {
                wnd.addEventListener('resize', handleResize);
                return () => wnd.removeEventListener('resize', handleResize);
            }
        }
    }, [wnd, disableResizeEvent]);
    return result;
}
